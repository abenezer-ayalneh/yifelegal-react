import React, {useEffect} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import config from "../../../config";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import {useDispatch} from "react-redux";
import {clearError} from "../../../utils/redux/slices/error-slice";

const SuccessSnackbar = ({success, handleCloseSuccessMessage}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearError())
    },[])

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={true}
            autoHideDuration={config.REACT_SNACKBAR_TIMEOUT}
            onClose={handleCloseSuccessMessage}
        >
            <Alert onClose={handleCloseSuccessMessage} variant="filled" color="success" severity="success">
                {/*<AlertTitle tyle={{fontSize:12}}>{success.type ?? "Success"}</AlertTitle>*/}
                {success.message}
            </Alert>
        </Snackbar>
    )
}

export default SuccessSnackbar;