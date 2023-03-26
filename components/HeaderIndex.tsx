import Image from 'next/image'
import Link from 'next/link'

import { SiteNav } from '@components/SiteNav'
import { HeaderBackground } from '@components/HeaderBackground'
import { useOverlay } from '@components/contexts/overlayProvider'
import { getLang, get } from '@utils/use-lang'
import { GhostSettings, NextImage } from '@lib/ghost'

interface HeaderIndexProps {
  settings: GhostSettings
}

export const HeaderIndex = ({ settings }: HeaderIndexProps) => {
  const text = get(getLang(settings.lang))
  const site = settings
  const siteLogo = site.logoImage
  const coverImg = site.cover_image || ''
  const title = text(`SITE_TITLE`, site.title)

  const { processEnv } = settings
  const { siteUrl, nextImages } = processEnv
  const { feature: nextFeatureImages, quality: imageQuality } = nextImages

  // targetHeight is coming from style .site-logo
  const targetHeight = 55
  const calcSiteLogoWidth = (image: NextImage, targetHeight: number) => {
    const { width, height } = image.dimensions
    return (targetHeight * width) / height
  }

  const { handleOpen } = useOverlay()

  return (
    <header className="site-home-header">
      <HeaderBackground srcImg={coverImg}>
        <div className="inner">
          <SiteNav className="site-nav" {...{ siteUrl, settings }} />
          <div className="site-header-content">
            <h1 className="site-title">
              {/* title */"La tecnología, explicada por personas como tú"}
             {/*  La tecnología, explicada por personas como tú */}
              {siteLogo && nextFeatureImages ? (
                <Link href="/">
                  <a>
                    {/* <div
                      className="site-logo"
                      style={{
                        marginTop: '8px',
                        height: `${targetHeight}px`,
                        width: `${calcSiteLogoWidth(siteLogo, targetHeight)}px`,
                      }}
                    >
                      <Image src={siteLogo.url} alt={title} layout="responsive" quality={imageQuality} {...siteLogo.dimensions} />
                    </div> */}
                  </a>
                </Link>
              ) : site.logo ? (
                <Link href="/">
                  <a>
                    {/* eslint-disable @next/next/no-img-element */}
                    {/* <img className="site-logo" src={site.logo} alt={title} /> */}
                  </a>
                </Link>
              ) : (
                title
              )}
            </h1>
            <h2 className="site-description">{/* site.description */"Hacemos de la información tecnológica en español algo colaborativo y abierto, manteniendo siempre el enfoque en la comunidad"}</h2>
            <div className="site-header-buttons-container">
              <a onClick={() => alert("hello")} type="button" className="flex items-center justify-center text-gray-100 decoration-white hover:no-underline font-semibold cursor-pointer border border-solid border-gray-100 rounded-[37px] px-8 py-3">
                Escribir un artículo
              </a>
              <a type="button" className="site-header-buttons" style={{ color: "black", backgroundColor: "white"}} onClick={handleOpen}>
                {text(`SUBSCRIBE_ME`)}
              </a>
            </div>
          </div>
        </div>
      </HeaderBackground>
    </header>
  )
}
