import YifelegalLogo from "../../../assets/images/yifelelgal-logo.svg"

const Logo = ({size}:{size?: number}) => (
    <img src={YifelegalLogo} alt={"application logo"} width={size ?? "100%"} height={size ?? "100%"}/>
)

export default Logo