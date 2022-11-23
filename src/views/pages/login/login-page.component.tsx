import React, {FormEvent, useRef} from "react"
import {Button, Divider, Grid, Paper, Typography, useTheme} from "@mui/material";
import Logo from "../../components/logo/logo.component";
import {useNavigate} from "react-router-dom";
import {TextField} from "../../components/text-field/text-field.component";
import {useDispatch} from "react-redux";
import {setPhoneNumber} from "../../../utils/redux/slices/user-slice";
import {useAppDispatch} from "../../../utils/hooks/redux-hooks";

interface PhoneNumber {
    phoneNumber: string | undefined,
}

const LoginPage = (): JSX.Element => {
    const phoneNumberRef = useRef<HTMLInputElement | null>(null)
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleLogin = (event: FormEvent) => {
        event.preventDefault()
        dispatch(setPhoneNumber({phoneNumber: phoneNumberRef.current?.value ?? null}))
        navigate("/otp-confirmation")
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
                            <TextField required label={"Phone Number"} style={{width:"100%"}} inputRef={phoneNumberRef}/>
                        </Grid>
                        <Grid item xs={12} paddingY={2}>
                            <Button variant={"contained"} sx={{width: "200px", height: "40px"}} type={"submit"}>
                                Login
                            </Button>
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
        </Paper>
    )
}

export default LoginPage