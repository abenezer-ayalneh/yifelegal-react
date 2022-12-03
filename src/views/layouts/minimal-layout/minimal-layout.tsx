import {Outlet} from 'react-router-dom';
import React from "react";
import ErrorSnackbar from "../../components/snackbars/error-snackbar.component";
import {clearError} from "../../../utils/redux/slices/error-slice";
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import SuccessSnackbar from "../../components/snackbars/success-snackbar.component";


const MinimalLayout = () => {
    const success = useAppSelector((state) => state.success);
    const error = useAppSelector((state) => state.error);
    const dispatch = useDispatch();

    const handleCloseErrorMessage = (event:React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearError());
    }

    const handleCloseSuccessMessage = (event:React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearError());
    }

    return (
        <>
            {
                success.message && <SuccessSnackbar success={success} handleCloseSuccessMessage={handleCloseSuccessMessage}/>
            }
            {
                error.message && <ErrorSnackbar error={error} handleCloseErrorMessage={handleCloseErrorMessage}/>
            }
            <Outlet/>
        </>
    );
}

export default MinimalLayout;
