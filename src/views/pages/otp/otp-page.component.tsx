import React, {FormEvent} from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import {Grid, Paper, Typography} from "@mui/material";
import Logo from "../../components/logo/logo.component";
import {useNavigate} from "react-router-dom";
import OTPTextField from "../../components/otp-textfield/otp-textfield.component";
import useSend from "../../../utils/hooks/use-send";
import config from "../../../config";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import useAuth from "../../../utils/hooks/use-auth";

const OTPPage = (): JSX.Element => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user)
    const {signIn,isRequestLoading: isSigningIn} = useAuth()

    const handleOTPConfirmationFormSubmit = async (event: FormEvent) => {
        event.preventDefault()
        // TODO OTP code sending and confirmation

        let loginResult = await signIn(user.phoneNumber ?? "")

        if (loginResult) {
            navigate("/home", {replace: true,})
        } else {
            navigate("/personal-information")
        }
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
                        <OTPTextField/>
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