const axios = require("axios");
const fs = require("fs");
const dotenv = require('dotenv');

dotenv.config();



// Fetch page slugs from Ghost CMS API
async function fetchPageSlugs() {
  console.log(process.env)
  const response = await axios.get(
    `${process.env.CMS_GHOST_API_URL}/ghost/api/v3/content/pages/?key=${process.env.CMS_GHOST_API_KEY}`,
  );

  return response.data.pages.map((page) => page.slug);
}

// Create a route file for each page slug
async function createRouteFiles() {
  const slugs = await fetchPageSlugs();
  console.log(slugs)



  // Loop through each slug and create a route file and component
  slugs.forEach((slug) => {

    const firstLetter = slug.charAt(0).toUpperCase() + slug.slice(1)
    const componentName = firstLetter.replace(/-([a-z])/g, function (g) { console.log(g); return g[1].toUpperCase(); });


    const routeFileName = `${slug}.tsx`;
    const routeFilePath = `./pages/${routeFileName}`;

    // Create the route file
    fs.writeFileSync(routeFilePath, "");

    // Create the component inside the route file
    fs.appendFileSync(
      routeFilePath,
      `
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface Page {
  id: string
  slug: string
  title: string
  html: string
}

export default function ${componentName}() {
  const router = useRouter();
  const { pathname: slug } = router;

  // Fetch page data from Ghost CMS API
  const getPageData = async (): Promise<Page> => {
    const response = await axios.get(
      \`\${process.env.CMS_GHOST_API_URL}\/ghost/api/v3/content/pages/slug/\${slug}/?key=\${process.env.CMS_GHOST_API_KEY}\`,
    );

    return response.data.pages[0];
  };

  const { data: pageData, isLoading, isError }: UseQueryResult<Page> = useQuery(
    ["pageData", slug],
    getPageData
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading page data.</div>;

  return (
    <div>
      <h1>{pageData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData.html }} />
    </div>
  );
}
    `
    );
  });
}

createRouteFiles();