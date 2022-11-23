import axios, {AxiosRequestConfig} from "axios";
import {setError} from "../redux/slices/error-slice";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "./redux-hooks";

const useFetch = (axiosParams: AxiosRequestConfig<any>, queryKey: string = Math.random().toString(36).slice(2, 7), cacheTime: number = 0) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const fetchData = async () => {
        axios.defaults.withCredentials = true;
        let result = await axios.request({
            ...axiosParams,
            headers: {
                Accept: "application/json",
                ...axiosParams.headers,
            },
        }).catch((result) => {
            if (result.response.status === 401) {
                return navigate("/login")
            }
        });

        return result?.data ?? [];
    }

    const {
        data,
        error,
        isFetching,
        isLoading,
        isError,
        isSuccess,
        status,
    } = useQuery(
        [queryKey],
        fetchData,
        {
            staleTime: cacheTime,
            cacheTime: cacheTime,
        }
    );


    if (isError) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                dispatch(setError({type: `Error: ${error.response?.statusText}`, message: error.response?.data.message}))
            } else {
                if (error) dispatch(setError({type: `Error: ${error.code}`, message: error.message}))
            }
        }else{
            console.error(error)
        }
    } else if (isSuccess && !data?.status) {
        dispatch(setError({type: `Error`, message: data.message}))
    }

    return {responseData: data, isRequestLoading: isLoading, requestError: error, isRequestFetching: isFetching, requestStatus: status};
}

export default useFetch;