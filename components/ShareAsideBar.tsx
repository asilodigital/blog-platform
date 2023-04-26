import ShareButton from "./common/ShareButtons";

function ShareAsideBar(props: any) {
    return (
        <div className="flex w-full max-w-7xl justify-center items-center gap-3">
            <ShareButton url={props.url} description={`${props.title} \n\n ${props.description}`} shareIn="Clipboard" />
            <ShareButton url={props.url} description={`${props.title} \n\n ${props.description}`} shareIn="Twitter" />
            <ShareButton url={props.url} description={`${props.title} \n\n ${props.description}`} shareIn="Linkedin" />
            <ShareButton description={`${props.title} \n ${props.description}`} url={props.url} shareIn="Telegram" />
        </div>
    )
}

export default ShareAsideBar;
