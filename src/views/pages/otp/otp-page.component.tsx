import React, {FormEvent, useRef} from "react"
import {Button, Divider, Grid, Paper, Typography, useTheme} from "@mui/material";
import Logo from "../../components/logo/logo.component";
import {useNavigate} from "react-router-dom";
import OTPTextField from "../../components/otp-textfield/otp-textfield.component";

const OTPPage = (): JSX.Element => {
    const phoneNumberRef = useRef<HTMLInputElement | null>(null)
    const theme = useTheme()
    const navigate = useNavigate();
    const handleOTPConfirmationFormSubmit = (event: FormEvent) => {
        event.preventDefault()
        navigate("/personal-information")
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
                            <Typography variant={"h1"}>OTP Confirmation</Typography>
                        </Grid>
                        <Grid item>
                            <OTPTextField/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant={"contained"} type={"submit"} sx={{width: "200px", height: "40px"}}>
                                Enter
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default OTPPage