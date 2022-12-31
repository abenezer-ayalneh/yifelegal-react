import {Navigate} from "react-router-dom";
import useFetch from "../../../utils/hooks/use-fetch";
import config from "../../../config";
import FullscreenLoadingAnimation from "../../components/fullscreen-loading-animation/fullscreen-loading-animation";
import {ReactNode} from "react";

const AuthRoutes = ({children}: { children: ReactNode }): JSX.Element => {
    const {responseData} = useFetch({
        method: "POST",
        url: config.REACT_APP_ROOT_URL + "check/token"
    }, "check-user-on-auth-routes",150000)

    if (!responseData) {
        return <FullscreenLoadingAnimation/>
    } else {
        return (
            responseData.data?.user ? <Navigate to={"/home"}/> : <>{children}</>
        );
    }
}

export default AuthRoutes;