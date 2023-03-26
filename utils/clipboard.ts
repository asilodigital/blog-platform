import { toast } from 'react-toastify';

const copyToTheClipboard = (content: string) => {
    navigator.clipboard.writeText(content)

    toast.success('Copiado al portapapeles', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
}

export default copyToTheClipboard;
