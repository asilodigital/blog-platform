/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'

import { readingTime as readingTimeHelper } from '@lib/readingTime'

import { resolveUrl } from '@utils/routing'
import { getLang, get } from '@utils/use-lang'

import { Layout } from '@components/Layout'
import { HeaderPost } from '@components/HeaderPost'
import { AuthorList } from '@components/AuthorList'
import { PreviewPosts } from '@components/PreviewPosts'
import { RenderContent } from '@components/RenderContent'
import { CommentoComments } from '@components/CommentoComments'
import { DisqusComments } from '@components/DisqusComments'
import { Subscribe } from '@components/Subscribe'
import { TableOfContents } from '@components/toc/TableOfContents'
import ShareAsideBar from './ShareAsideBar'

import { StickyNavContainer } from '@effects/StickyNavContainer'
import { SEO } from '@meta/seo'

import { PostClass } from '@helpers/PostClass'
import { GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'
import { collections } from '@lib/collections'

import { ISeoImage } from '@meta/seoImage'

import React from 'react'

interface PostProps {
  cmsData: {
    post: GhostPostOrPage
    settings: GhostSettings
    seoImage: ISeoImage
    previewPosts?: GhostPostsOrPages
    prevPost?: GhostPostOrPage
    nextPost?: GhostPostOrPage
    bodyClass: string
  }
}

export const Post = ({ cmsData }: PostProps) => {
  const { post, settings, seoImage, previewPosts, prevPost, nextPost, bodyClass } = cmsData
  const { slug, url, meta_description, excerpt, title} = post
  const { url: cmsUrl } = settings
  const description = meta_description || excerpt

  const { processEnv } = settings
  const { nextImages, toc, memberSubscriptions, commenting } = processEnv

  const lang = settings.lang
  const text = get(getLang(lang))
  const featImg = post.featureImage
  const postClass = PostClass({ tags: post.tags, isFeatured: !!featImg, isImage: !!featImg })

  const htmlAst = post.htmlAst
  if (htmlAst === undefined) throw Error('Post.tsx: htmlAst must be defined.')

  const collectionPath = collections.getCollectionByNode(post)

  return (
    <>
      <SEO {...{ description, settings, seoImage, article: post, title }} />
      <StickyNavContainer
        throttle={300}
        isPost={true}
        activeClass="nav-post-title-active"
        render={(sticky) => (
          <Layout
            {...{ bodyClass, settings, sticky }}
            header={<HeaderPost {...{ settings, sticky, title }} />}
            previewPosts={<PreviewPosts {...{ settings, primaryTag: post.primary_tag, posts: previewPosts, prev: prevPost, next: nextPost }} />}
          >
            <div className="inner">
              <article className={`post-full ${postClass}`}>
                <header className="post-full-header">
                  {post.primary_tag && (
                    <section className="post-full-tags">
                      <Link href={resolveUrl({ cmsUrl, slug: post.primary_tag.slug, url: post.primary_tag.url })}>
                        <a className='w-[84px] min-w-fit max-w-fit text-black dark:text-white text-center border border-solid border-gray-400 rounded-[22px] my-4 px-6 pb-2 pt-2'>
                          {post.primary_tag.name}
                        </a>
                      </Link>
                    </section>
                  )}

                  <h1 ref={sticky && sticky.anchorRef} className="post-full-title">
                    {title}
                  </h1>

                  {post.custom_excerpt && <p className="post-full-custom-excerpt">{post.custom_excerpt}</p>}


                  <ShareAsideBar title={title} description={description} url={url} />
                </header>

                {featImg &&
                  (nextImages.feature && featImg.dimensions ? (
                    <figure className="post-full-image" style={{ display: 'inherit' }}>
                      <Image
                        src={featImg.url}
                        alt={title}
                        quality={nextImages.quality}
                        layout="responsive"
                        sizes={`
                              (max-width: 350px) 350px,
                              (max-width: 530px) 530px,
                              (max-width: 710px) 710px,
                              (max-width: 1170px) 1170px,
                              (max-width: 2110px) 2110px, 2000px
                            `}
                        {...featImg.dimensions}
                      />

                      <figcaption className="w-full flex text-[#999] bg-white dark:bg-[#0E0C15] leading-normal justify-end mt-1 [&>a]:px-1 [&>a]:no-underline [&>a]:text-black dark:[&>a]:text-white"

                        dangerouslySetInnerHTML={{__html: `${post.feature_image_caption ?? ''}`}}>

                      </figcaption>
                    </figure>
                  ) : (
                    post.feature_image && (
                      <figure className="post-full-image">
                        <img src={post.feature_image} alt={title} />
                      </figure>
                    )
                  ))}

                  <div className="post-full-byline pb-12">
                    <section className="post-full-byline-content">
                      <AuthorList {...{ settings, authors: post.authors, isPost: true }} />

                      <section className="post-full-byline-meta">
                        <h4 className="author-name">
                          {post.authors?.map((author, i) => (
                            <div key={i}>
                              {i > 0 ? `, ` : ``}
                              <Link href={resolveUrl({ cmsUrl, slug: author.slug, url: author.url || undefined })}>
                                <a>{author.name}</a>
                              </Link>
                            </div>
                          ))}
                        </h4>
                        <div className="byline-meta-content">
                          <time className="byline-meta-date" dateTime={post.published_at || ''}>
                            {dayjs(post.published_at || '').format('D MMMM, YYYY')}&nbsp;
                          </time>
                        </div>
                      </section>
                    </section>
                  </div>

                <section className="post-full-content">
                  {toc.enable && !!post.toc && <TableOfContents {...{ toc: post.toc, url: resolveUrl({ cmsUrl, collectionPath, slug, url }), maxDepth: toc.maxDepth, lang }} />}
                  <div className="post-content load-external-scripts">
                    <RenderContent htmlAst={htmlAst} />
                  </div>
                </section>

                <section className="flex flex-col items-center justify-items-center gap-6 py-10 lg:pt-0">
                  <p className="not-italic font-bold mb-0">Compártelo para llegue más lejos 🚀</p>
                  <ShareAsideBar title={description} url={url} />
                </section>

                {memberSubscriptions && <Subscribe {...{ settings }} />}

                {commenting.system === 'commento' && <CommentoComments {...{ id: post.id, url: commenting.commentoUrl }} />}

                {commenting.system === 'disqus' && <DisqusComments {...{ post, shortname: commenting.disqusShortname, siteUrl: processEnv.siteUrl }} />}
              </article>
            </div>
          </Layout>
        )}
      />
    </>
  )
}
