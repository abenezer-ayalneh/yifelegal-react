import {Navigate, useNavigate} from "react-router-dom";
import useFetch from "../../../utils/hooks/use-fetch";
import config from "../../../config";
import FullscreenLoadingAnimation from "../../components/fullscreen-loading-animation/fullscreen-loading-animation";
import {ReactNode} from "react";

const ProtectedRoutes = ({children}: { children: ReactNode }): JSX.Element => {
    const navigate = useNavigate();
    const {isRequestLoading, responseData} = useFetch({
        method: "POST",
        url: config.REACT_APP_ROOT_URL + "checkToken"
    },"check-token-on-protected-routes")
    if (isRequestLoading && !responseData) {
        return <FullscreenLoadingAnimation/>
    } else {
        return (
            responseData.data?.user ? <>{children}</> : <Navigate to={"/"}/>
            // TODO redirect to landing page based on response
        );
    }
}

export default ProtectedRoutes;