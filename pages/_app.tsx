import { useEffect } from 'react'
import Script from 'next/script'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import { OverlayProvider } from '@components/contexts/overlayProvider'
import { ThemeProvider } from '@components/contexts/themeProvider'
import { processEnv } from '@lib/processEnv'
import * as gtag from '../lib/gtag'

import 'react-toastify/dist/ReactToastify.css';
import '@styles/screen.css'
import '@styles/screen-fixings.css'
import '@styles/dark-mode.css'
import '@styles/prism.css'
import '@styles/toc.css'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider {...processEnv.darkMode} >
      <OverlayProvider >
        {/* Global site tag (gtag.js) - Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtag.GA_TRACKING_ID}');

              window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
              `,
          }}
        />
        <Component {...pageProps} />
      </OverlayProvider>
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
