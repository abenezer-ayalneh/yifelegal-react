import React from "react";
import Modal from "@mui/material/Modal";
import {ModalBody, ModalContainer} from "./modal.styles";
import Grid from "@mui/material/Grid";
import {IconX} from "@tabler/icons";
import Divider from "@mui/material/Divider";
import {useTheme} from "@mui/material";
import 'react-perfect-scrollbar/dist/css/styles.css';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

type CustomModalTypes = {
    open: boolean,
    title: string,
    handleClose: () => void,
    buttons?: JSX.Element[],
    children: JSX.Element,
}

const CustomModal = ({open = false, title, handleClose, buttons, children, ...otherProps}: CustomModalTypes) => {
    const theme = useTheme();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalContainer theme={theme} {...otherProps}>
                <Grid container direction="column">
                    <Grid item sx={{px: 3, py: 1}}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="h3" fontWeight="normal" id="modal-modal-title">{title}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleClose}>
                                    <IconX size={20}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider style={{backgroundColor: theme.palette.secondary.light}}/>
                    <ModalBody>
                        {
                            children
                        }
                    </ModalBody>
                    {
                        buttons &&
                        <>
                            <Divider style={{backgroundColor: theme.palette.secondary.light}}/>
                            <Grid container justifyContent="end" spacing={1} sx={{py: 1, px: 2,}}>
                                <Grid item>
                                    {
                                        buttons
                                    }
                                </Grid>
                            </Grid>
                        </>
                    }
                </Grid>
            </ModalContainer>
        </Modal>
    )
}

export default CustomModal;