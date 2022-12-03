import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import config from "../../../config";

const SuccessSnackbar = ({success, handleCloseSuccessMessage}) => {
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
                <AlertTitle>{success.type ?? "Success"}</AlertTitle>
                {success.message}
            </Alert>
        </Snackbar>
    )
}

export default SuccessSnackbar;