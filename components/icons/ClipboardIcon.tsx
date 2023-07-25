import ClipBoardLightMode from '../../public/clipboard.svg'
import ClipBoardDarkMode from '../../public/ClipboardDarkMode.svg'
import { useTheme } from '@components/contexts/themeProvider'
import Image from 'next/image'

function Clipboard_Icon() {

  const {dark} = useTheme()

  return (
    <Image src={dark == 'dark' ? ClipBoardLightMode : ClipBoardDarkMode}
         alt="Ilustración de una cadena"
         width="32px"
         height="16px"
         placeholder="empty"
         className="object-fill"
    ></Image>
  )
}

export default Clipboard_Icon;
