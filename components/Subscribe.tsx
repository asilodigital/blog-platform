import { GhostSettings } from '@lib/ghost'
import { getLang, get } from '@utils/use-lang'
import { SubscribeForm } from '@components/SubscribeForm'

export const Subscribe = ({ settings }: { settings: GhostSettings }) => {
  const text = get(getLang(settings.lang))
  const title = text(`SITE_TITLE`, settings.title)

  return (
    <section className="subscribe-form">
      <img className='subscribe-form-img' src="https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/610e34549c43a583678e351c_37.png" alt=""/>
      <h3 className="subscribe-form-title">
        {text(`SUBSCRIBE_TO`)} {title}
      </h3>
      <p className="subscribe-form-description">{text(`SUBSCRIBE_SECTION`)}</p>
      <SubscribeForm {...{ settings }} />
    </section>
  )
}
