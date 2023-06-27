import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { setError } from "../redux/slices/error-slice";
import { setSuccess } from "../redux/slices/success-slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux-hooks";

const useSend = (axiosParams: AxiosRequestConfig<any> = {}) => {
  const [isRequestLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sendRequest = async (
    sendRequestParams: AxiosRequestConfig<any> = {},
    showSuccessMessage: boolean = false
  ) => {
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const result = await axios
        .request({
          ...axiosParams,
          ...sendRequestParams,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            ...axiosParams.headers,
            ...sendRequestParams.headers,
          },
        })
        .catch((result) => {
          let code = result?.response?.status;
          switch (code) {
            case 401:
              !["login", "otp-confirmation", "personal-information"].some(
                (route: string) => route === location.pathname
              ) && navigate("/login");
              break;
            case 403:
              dispatch(
                setError({
                  type: "Authorization Error",
                  message: result?.response?.data?.message,
                })
              );
              break;
            case 422:
              dispatch(
                setError({
                  type: "Validation Error",
                  message: result?.response?.data?.message,
                })
              );
              break;
            case 500:
              dispatch(
                setError({
                  type: "Server issue",
                  message:
                    "Please check you connection or contact the administrator",
                })
              );
              break;
            default:
              dispatch(
                setError({
                  type: "Sorry! The server ran into a problem",
                  message: "Please contact the administrator",
                })
              );
          }
        });

      if (result?.status?.toString().startsWith("2")) {
        if (result.data.status) {
          showSuccessMessage &&
            dispatch(
              setSuccess({ type: `Success`, message: result.data.message })
            );
          return result?.data ?? [];
        } else {
          dispatch(setError({ type: `Error`, message: result.data.message }));
        }
      }
    } catch (exception) {
      if (axios.isAxiosError(exception)) {
        if (exception.response) {
          dispatch(
            setError({
              type: `Error: ${exception.response?.statusText}`,
              message: exception.response?.data.message,
            })
          );
        } else {
          if (exception)
            dispatch(
              setError({
                type: `Error: ${exception.code}`,
                message: exception.message,
              })
            );
        }
      } else {
        console.error(exception);
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, isRequestLoading };
};

export default useSend;
