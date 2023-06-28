import axios, { AxiosRequestConfig } from "axios";
import { setError } from "../redux/slices/error-slice";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux-hooks";
import { axiosPrivate } from "../axios/axios-private.interceptor";

const useFetch = (
  axiosParams: AxiosRequestConfig<any>,
  queryKey: string = Math.random().toString(36).slice(2, 7),
  cacheTime: number = 0
) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    axios.defaults.withCredentials = true;
    let result = await axiosPrivate
      .request({
        ...axiosParams,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          ...axiosParams.headers,
        },
      })
      .catch((result) => {
        let code = result?.response?.status;
        switch (code) {
          case 401:
            !["/login", "/otp-confirmation", "/personal-information"].includes(
              location.pathname
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

    return result?.data ?? [];
  };

  const { data, error, isFetching, isLoading, isError, isSuccess, status } =
    useQuery([queryKey], fetchData, {
      // staleTime: cacheTime,
      // cacheTime: cacheTime,
      cacheTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });

  if (isError) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        dispatch(
          setError({
            type: `Error: ${error.response?.statusText}`,
            message: error.response?.data.message,
          })
        );
      } else {
        if (error)
          dispatch(
            setError({ type: `Error: ${error.code}`, message: error.message })
          );
      }
    } else {
      console.error(error);
    }
  } else if (isSuccess && !data?.status) {
    dispatch(setError({ type: `Error`, message: data.message }));
  }

  return {
    responseData: data,
    isRequestLoading: isLoading,
    requestError: error,
    isRequestFetching: isFetching,
    requestStatus: status,
  };
};

export default useFetch;
