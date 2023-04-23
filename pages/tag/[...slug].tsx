import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { Layout } from '@components/Layout'
import { PostView } from '@components/PostView'
import { HeaderTag } from '@components/HeaderTag'

import { resolveUrl } from '@utils/routing'
import { SEO } from '@meta/seo'
import { Tag } from '@tryghost/content-api'

import { getPostsByTag, getAllTags, getAllSettings, GhostSettings, GhostPostOrPage, GhostPostsOrPages, GhostAuthor, getTagBySlug } from '@lib/ghost'
import { ISeoImage, seoImage } from '@meta/seoImage'
import { processEnv } from '@lib/processEnv'

import { BodyClass } from '@helpers/BodyClass'

/**
 * Author page (/author/:slug)
 *
 * Loads all posts for the requested author incl. pagination.
 *
 */
interface CmsData {
  author: GhostAuthor
  posts: GhostPostsOrPages
  seoImage: ISeoImage
  previewPosts?: GhostPostsOrPages
  prevPost?: GhostPostOrPage
  nextPost?: GhostPostOrPage
  settings: GhostSettings
  bodyClass: string
  tag: Tag
}

interface AuthorIndexProps {
  cmsData: CmsData
}

const AuthorIndex = ({ cmsData }: AuthorIndexProps) => {
  const router = useRouter()
  if (router.isFallback) return <div>Loading...</div>

  const { posts, settings, seoImage, bodyClass, tag } = cmsData
  const { name } = tag

  return (
    <>
      <SEO {...{ settings, seoImage, title: name }} />
      <Layout {...{ settings, bodyClass }} header={<HeaderTag {...{ settings, tag }} />}>
        <PostView {...{ settings, posts }} />
      </Layout>
    </>
  )
}

export default AuthorIndex

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!(params && params.slug && Array.isArray(params.slug))) throw Error('getStaticProps: wrong parameters.')
  const [slug] = params.slug.reverse()

  const posts = await getPostsByTag(slug)
  const tag = await getTagBySlug(slug)
  const settings = await getAllSettings()

  const { feature_image } = tag
  const siteUrl = settings.processEnv.siteUrl
  const imageUrl = feature_image || undefined
  const tagImage = await seoImage({ siteUrl, imageUrl })

  return {
    props: {
      cmsData: {
        posts,
        settings,
        seoImage: tagImage,
        bodyClass: BodyClass({ isHome: true }),
        tag
      },
    },
    ...(processEnv.isr.enable && { revalidate: processEnv.isr.revalidate }), // re-generate at most once every revalidate second
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags()
  const settings = await getAllSettings()
  const { url: cmsUrl } = settings

  const paths = tags.map(({ slug, url }) => resolveUrl({ cmsUrl, slug, url: url || undefined })).filter((path) => path.startsWith(`/tag/`))

  return {
    paths,
    fallback: processEnv.isr.enable,
  }
}
