import React, {useEffect} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import config from "../../../config";
import {useDispatch} from "react-redux";
import {clearSuccess} from "../../../utils/redux/slices/success-slice";

const ErrorSnackbar = ({error, handleCloseErrorMessage}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearSuccess())
    }, [])

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={true}
            autoHideDuration={config.REACT_SNACKBAR_TIMEOUT}
            onClose={handleCloseErrorMessage}
        >
            <Alert onClose={handleCloseErrorMessage} severity="error" sx={{width: '100%'}}>
                <AlertTitle style={{fontSize: 14}}>{error.type ?? "Error"}</AlertTitle>
                {error.message}
            </Alert>
        </Snackbar>
    )
}

export default ErrorSnackbar;