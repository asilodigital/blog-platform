import LinkedinLightMode from '../../public/Linkedin.svg'
import LinkedinDarkMode from '../../public/LinkedinDarkMode.svg'
import { useTheme } from '@components/contexts/themeProvider'
import Image from 'next/image'

function Linkedin_Icon() {

  const {dark} = useTheme()

  return (

    <Image src={dark == 'dark' ? LinkedinLightMode : LinkedinDarkMode}
         alt="Ilustración de una cadena"
         width="32px"
         height="16px"
         placeholder="empty"
    ></Image>
  )
}

export default Linkedin_Icon;
