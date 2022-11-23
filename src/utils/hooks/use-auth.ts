import {useDispatch} from "react-redux";
import useSend from "./use-send";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {clearUser, setUser} from "../redux/slices/user-slice";
import config from "../../config";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const {sendRequest, isRequestLoading} = useSend({
        method: "POST",
    });

    const signIn = async (credentials: { name: null | string, phoneNumber: null | string } = {name: null, phoneNumber: null}) => {

        let result = await sendRequest({
            url: config.REACT_APP_ROOT_URL + "login",
            headers: {
                withCredentials: false,
                accept: "application/json",
            },
            data: {
                name: credentials.name,
                phoneNumber: credentials.phoneNumber
            }
        })
        if (result?.status) {
            dispatch(setUser({user: result.data.response}))

            return true;
        } else {
            return false;
        }
    };

    const signOut = async () => {
        let result = await sendRequest({
            url: config.REACT_APP_ROOT_URL + "logout",
        })

        if (result.status) {
            dispatch(clearUser())
            return navigate("/login")
        } else {
            return false;
        }
    };

    const checkAuth = async () => {
        let result = await sendRequest({
            url: config.REACT_APP_ROOT_URL + "user",
        })

        if (result?.status) {
            setIsCheckingAuth(false)
            dispatch(setUser({user: result.data}))
            return true;
        } else {
            setIsCheckingAuth(false)
            return false;
        }
    }

    return {signIn, signOut, checkAuth, isCheckingAuth, isRequestLoading};
}

export default useAuth;