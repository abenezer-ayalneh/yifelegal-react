import React, {FormEvent, useRef, useState} from "react"
import {Button, Divider, Grid, Paper, Typography, useTheme} from "@mui/material";
import Logo from "../../components/logo/logo.component";
import {useNavigate} from "react-router-dom";
import {TextField} from "../../components/text-field/text-field.component";
import {setPhoneNumber} from "../../../utils/redux/slices/user-slice";
import {useAppDispatch} from "../../../utils/hooks/redux-hooks";
import {firebaseAuth} from "../../../utils/firebase/firebase-config"
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {setError} from "../../../utils/redux/slices/error-slice";
import LoadingButton from "@mui/lab/LoadingButton";

declare global {
    interface Window {
        MyNamespace: any;
    }
}
window.MyNamespace = window.MyNamespace || {};

const LoginPage = (): JSX.Element => {
    const phoneNumberRef = useRef<HTMLInputElement | null>(null)
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isRecaptchaGenerating, setIsRecaptchaGenerating] = useState<boolean>(false)
    const generateRecaptcha = () => {
        setIsRecaptchaGenerating(true)
        window.MyNamespace.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            // 'callback': () => {
            //     // reCAPTCHA solved, allow signInWithPhoneNumber.
            // },
        }, firebaseAuth);

        let appVerifier = window.MyNamespace.recaptchaVerifier
        signInWithPhoneNumber(firebaseAuth, phoneNumberRef.current?.value ?? "", appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.MyNamespace.confirmationResult = confirmationResult;
                navigate("/otp-confirmation")
            }).catch((error) => {
            // Error; SMS not sent
            console.error(error)
            dispatch(setError({type: "OTP Verification Failed", message: error.message}))
        }).finally(() => setIsRecaptchaGenerating(true));
    }
    const handleLogin = (event: FormEvent) => {
        event.preventDefault()
        dispatch(setPhoneNumber({phoneNumber: phoneNumberRef.current?.value}))
        generateRecaptcha()
    }

    return (
        <Paper>
            <form onSubmit={handleLogin}>
                <Grid container width={"100vw"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                    <Grid container direction={"column"} width={{xs: 300, md: 450}} justifyContent={"center"} alignItems={"center"} rowSpacing={2}>
                        <Grid item xs={12} width={{xs: 150, md: 200}}>
                            <Logo/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h1"}>Sign In</Typography>
                        </Grid>
                        <Grid item xs={12} paddingY={2} width={{xs: 300, md: 450}}>
                            <TextField required label={"Phone Number"} style={{width: "100%"}} inputRef={phoneNumberRef}/>
                        </Grid>
                        <Grid item xs={12} paddingY={2}>
                            <LoadingButton loading={isRecaptchaGenerating} variant={"contained"} sx={{width: "200px", height: "40px"}} type={"submit"}>
                                Login
                            </LoadingButton>
                        </Grid>
                        <Divider variant={"fullWidth"} flexItem sx={{py: 3}}><Typography variant={"body1"} color={theme.palette.grey["500"]}>OR</Typography></Divider>
                        <Grid item xs={12}>
                            <Button variant={"outlined"} sx={{width: "200px", height: "40px"}}>
                                Login with Google
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            <div style={{position: "fixed", bottom: 0, right: 0}} id="recaptcha-container"></div>
        </Paper>
    )
}

export default LoginPage