import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import config from "../../../config";

const ErrorSnackbar = ({error, handleCloseErrorMessage}) => {
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
                <AlertTitle>{error.type ?? "Error"}</AlertTitle>
                {error.message}
            </Alert>
        </Snackbar>
    )
}

export default ErrorSnackbar;