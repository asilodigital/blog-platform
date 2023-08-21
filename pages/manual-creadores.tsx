
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { ghostAPIUrl, ghostAPIKey } from '@lib/processEnv'

interface Page {
  id: string
  slug: string
  title: string
  html: string
}

export default function ManualCreadores(props: any) {
  const router = useRouter();
  const { pathname: slug } = router;

  // Fetch page data from Ghost CMS API
  const getPageData = async (): Promise<Page> => {
    const response = await axios.get(
      `${props.ghostAPIUrl}/ghost/api/v3/content/pages/slug/${slug}/?key=${props.ghostAPIKey}`,
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
      <h1>{pageData?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData?.html ?? "<h1>Type Undefined for pageData</h1>" }} />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: { ghostAPIUrl, ghostAPIKey }
  }
}
    