import { useTheme } from '@components/contexts/themeProvider'
import TwitterLightMode from '../../public/twitter.svg'
import TwitterDarkMode from '../../public/TwitterDarkMode.svg'
import Image from 'next/image'

function Twitter_Icon() {

  const {dark} = useTheme()

  return (
    <Image src={dark == 'dark' ? TwitterLightMode : TwitterDarkMode}
         alt="Ilustración de una cadena"
         width="32px"
         height="16px"
         placeholder="empty"
    ></Image>
  )
}

export default Twitter_Icon;
