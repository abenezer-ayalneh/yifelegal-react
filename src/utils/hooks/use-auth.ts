import { useDispatch } from "react-redux";
import useSend from "./use-send";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUser, setUser } from "../redux/slices/user-slice";
import config from "../../config";
const ROOT_URL = import.meta.env.VITE_ROOT_URL;
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { sendRequest, isRequestLoading } = useSend({
    method: "POST",
  });

  const signIn = async (phoneNumber: string): Promise<boolean> => {
    let result = await sendRequest({
      url: ROOT_URL + "login",
      headers: {
        withCredentials: false,
      },
      data: {
        phoneNumber: phoneNumber,
      },
    });
    if (result?.status) {
      dispatch(setUser({ user: result.data?.user }));
      localStorage.setItem("accessToken", result.data.accessToken);
    }

    return result?.status;
  };

  const signUp = async (credentials: {
    name: string;
    phoneNumber: string;
  }): Promise<boolean> => {
    let result = await sendRequest({
      url: ROOT_URL + "sign-up",
      headers: {
        withCredentials: false,
      },
      data: {
        name: credentials.name,
        phoneNumber: credentials.phoneNumber,
      },
    });
    console.log({ result });
    if (result?.status) {
      dispatch(setUser({ user: result.data?.user }));
      localStorage.setItem("accessToken", result.data.accessToken);

      return true;
    } else {
      return false;
    }
  };

  const signOut = async (): Promise<boolean> => {
    let result = await sendRequest({
      url: ROOT_URL + "logout",
    });

    if (result.status) {
      dispatch(clearUser());
      localStorage.removeItem("accessToken");
      navigate("/");
    }

    return result.status;
  };

  const checkAuth = async (): Promise<boolean> => {
    let result = await sendRequest({
      url: ROOT_URL + "me",
    });

    if (result?.status) {
      setIsCheckingAuth(false);
      dispatch(setUser({ user: result.data }));
      return true;
    } else {
      setIsCheckingAuth(false);
      return false;
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    checkAuth,
    isCheckingAuth,
    isRequestLoading,
  };
};

export default useAuth;
