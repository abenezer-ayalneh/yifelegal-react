import React, {FormEvent, useRef, useState} from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import {Grid, Paper, Typography} from "@mui/material";
import Logo from "../../components/logo/logo.component";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/redux-hooks";
import useAuth from "../../../utils/hooks/use-auth";
import {setError} from "../../../utils/redux/slices/error-slice";
import firebase from "firebase/compat";
import {useTranslation} from 'react-i18next';
import UserCredential = firebase.auth.UserCredential;

const OTPPage = (): JSX.Element => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const otpCodeInputRef = useRef<HTMLInputElement>(null)
    const user = useAppSelector((state) => state.user)
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false)
    const {signIn} = useAuth()

    const handleOTPConfirmationFormSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setIsSigningIn(true)
        const code = otpCodeInputRef.current?.value ?? "";
        window.MyNamespace.confirmationResult.confirm(code).then((response: UserCredential) => {
            // User signed in successfully.
            let loginResult = signIn(user.phoneNumber ?? "")
                .then((loginResult) => {
                    if (loginResult) {
                        navigate("/home", {replace: true,})
                    } else {
                        navigate("/personal-information")
                    }
                })
        }).catch(() => {
            dispatch(setError({type: "OTP Verification Failed", message: "Incorrect OTP code. Please try again"}))
        }).finally(() => setIsSigningIn(false));
    }

    return (
        <Paper>
            <form onSubmit={handleOTPConfirmationFormSubmit}>
                <Grid container width={"100vw"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                    <Grid container direction={"column"} width={{xs: 300, md: 450}} justifyContent={"center"} alignItems={"center"} rowSpacing={3}>
                        <Grid item xs={12} width={{xs: 150, md: 200}}>
                            <Logo/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h1"} textAlign={"center"}>{t("otpConfirmation")}</Typography>
                            <Typography variant={"body1"} textAlign={"center"}>{t("otpConfirmationInformation")}</Typography>
                        </Grid>
                        <Grid item>
                            <input type={"text"} ref={otpCodeInputRef} className={"form-control"} style={{textAlign: "center"}} autoFocus/>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton loading={isSigningIn} variant={"contained"} type={"submit"} sx={{width: "200px", height: "40px"}}>
                                {t("enter")}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            <div style={{position: "fixed", bottom: 0, right: 0}} id="recaptcha-container"></div>
        </Paper>
    )
}

export default OTPPage