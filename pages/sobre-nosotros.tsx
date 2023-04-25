
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface Page {
  id: string
  slug: string
  title: string
  html: string
}

export default function SobreNosotros() {
  const router = useRouter();
  const { pathname: slug } = router;

  // Fetch page data from Ghost CMS API
  const getPageData = async (): Promise<Page> => {
    const response = await axios.get(
      `${process.env.CMS_GHOST_API_URL}/ghost/api/v3/content/pages/slug/${slug}/?key=${process.env.CMS_GHOST_API_KEY}`,
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
    