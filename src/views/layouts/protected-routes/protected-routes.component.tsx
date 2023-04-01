import {Navigate, useLocation} from "react-router-dom";
import useFetch from "../../../utils/hooks/use-fetch";
import config from "../../../config";
import FullscreenLoadingAnimation from "../../components/fullscreen-loading-animation/fullscreen-loading-animation";
import {ReactNode, useEffect} from "react";
import {useAppDispatch} from "../../../utils/hooks/redux-hooks";
import {setUser} from "../../../utils/redux/slices/user-slice";

const ProtectedRoutes = ({children}: { children: ReactNode }): JSX.Element => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const {isRequestLoading, responseData} = useFetch({
        method: "POST",
        url: config.REACT_APP_ROOT_URL + "check/token"
    }, "check-token-on-protected-routes")

    useEffect(() => {
        if (responseData?.data?.user) {
            dispatch(setUser({user: responseData?.data?.user}))
        }
    }, [responseData])

    if (isRequestLoading && !responseData) {
        return <FullscreenLoadingAnimation/>
    } else {
        return (
            (responseData.data?.user)
                ? <>{children}</>
                : <Navigate to={"/"}/>
            // TODO redirect to landing page based on response
        );
    }
}

export default ProtectedRoutes;