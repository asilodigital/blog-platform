import { useTheme } from '@components/contexts/themeProvider'
import TelegramLightMode from '../../public/telegram.svg'
import TelegramDarkMode from '../../public/TelegramDarkMode.svg'
import Image from 'next/image'

function Twitter_Icon () {

  const {dark} = useTheme()

  return (
    <Image src={dark == 'dark' ? TelegramLightMode : TelegramDarkMode}
         alt="Ilustración de una cadena"
         width="32px"
         height="16px"
         placeholder="empty"
    ></Image>
  )
}

export default Twitter_Icon;
