import React, {FormEvent, useRef} from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import {Grid, Paper, Typography} from "@mui/material";
import Logo from "../../components/logo/logo.component";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import useAuth from "../../../utils/hooks/use-auth";
import {firebaseAuth} from "../../../utils/firebase/firebase-config";
import {signInWithPhoneNumber} from "firebase/auth";

const OTPPage = (): JSX.Element => {
    const navigate = useNavigate();
    const otpCodeInputRef = useRef<HTMLInputElement>(null)
    const user = useAppSelector((state) => state.user)
    const {signIn, isRequestLoading: isSigningIn} = useAuth()
    const handleOTPConfirmationFormSubmit = async (event: FormEvent) => {
        event.preventDefault()
        // TODO OTP code confirmation
        let appVerifier = window.MyNamespace.recaptchaVerifier
        signInWithPhoneNumber(firebaseAuth, otpCodeInputRef.current?.value ?? "", appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                // window.confirmationResult = confirmationResult;
                // ...
                console.log(confirmationResult)
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log(error)
        });

        // let loginResult = await signIn(user.phoneNumber ?? "")
        //
        // if (loginResult) {
        //     navigate("/home", {replace: true,})
        // } else {
        //     navigate("/personal-information")
        // }
    }
    return (<Paper>
        <form onSubmit={handleOTPConfirmationFormSubmit}>
            <Grid container width={"100vw"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                <Grid container direction={"column"} width={{xs: 300, md: 450}} justifyContent={"center"} alignItems={"center"} rowSpacing={3}>
                    <Grid item xs={12} width={{xs: 150, md: 200}}>
                        <Logo/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h1"}>OTP Confirmation</Typography>
                    </Grid>
                    <Grid item>
                        <input type={"text"} ref={otpCodeInputRef} className={"form-control"} style={{textAlign:"center"}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton loading={isSigningIn} variant={"contained"} type={"submit"} sx={{width: "200px", height: "40px"}}>
                            Enter
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    </Paper>)
}

export default OTPPage