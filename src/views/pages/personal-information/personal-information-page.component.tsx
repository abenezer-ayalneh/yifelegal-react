// @flow
import * as React from 'react';
import {FormEvent, useRef} from 'react';
import {Button, Grid, Paper, Typography} from "@mui/material";
import Logo from "../../components/logo/logo.component";
import {TextField} from "../../components/text-field/text-field.component";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import useSend from "../../../utils/hooks/use-send";
import useAuth from "../../../utils/hooks/use-auth";

export function PersonalInformationPage() {
    const user = useAppSelector((state) => state.user)
    const fullNameRef = useRef<HTMLInputElement | null>(null)
    const {signIn,isRequestLoading} = useAuth();
    const handlePersonalInformationFormSubmit = async (event: FormEvent) => {
        event.preventDefault()

        let requestData = {
            name: fullNameRef.current?.value ?? null,
            phoneNumber: user.phoneNumber ?? null,
        }

        await signIn(requestData)
    }
    return (
        <Paper>
            <form onSubmit={handlePersonalInformationFormSubmit}>
                <Grid container width={"100vw"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                    <Grid container direction={"column"} width={{xs: 300, md: 450}} justifyContent={"center"} alignItems={"center"} rowSpacing={3}>
                        <Grid item xs={12} width={{xs: 150, md: 200}}>
                            <Logo/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h1"}>Personal Information</Typography>
                        </Grid>
                        <Grid item xs={12} width={{xs: 300, md: 400}} height={{xs: 100}}>
                            <TextField required label={"Full Name"} inputRef={fullNameRef}/>
                        </Grid>
                        <Grid item xs={12} width={{xs: 300, md: 400}} height={{xs: 100}}>
                            <TextField disabled label={"Phone Number"} value={user.phoneNumber}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant={"contained"} type={"submit"} sx={{width: "200px", height: "40px"}}>
                                Enter
                            </Button>
                        </Grid>
                        <Grid item xs={12} width={"100%"}>
                            <Grid container justifyContent={"flex-start"} direction={"column"}>
                                <Grid item>
                                    <Typography variant={"subtitle2"} textAlign={"start"}>Disclaimer:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"subtitle2"} textAlign={"start"}>
                                        *&nbsp;&nbsp;&nbsp;&nbsp;The application will record the information you entered above
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"subtitle2"} textAlign={"start"}>
                                        *&nbsp;&nbsp;&nbsp;&nbsp;When you need our services and when we want to contact you
                                        we will use the information you entered above so make sure it
                                        is correct!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}