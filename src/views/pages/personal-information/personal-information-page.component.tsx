// @flow
import * as React from 'react';
import {FormEvent, useRef} from 'react';
import {Button, Grid, Paper, Typography} from "@mui/material";
import Logo from "../../components/logo/logo.component";
import {TextField} from "../../components/text-field/text-field.component";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import useAuth from "../../../utils/hooks/use-auth";
import {useNavigate} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {useTranslation} from "react-i18next";

export function PersonalInformationPage() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.user)
    const fullNameRef = useRef<HTMLInputElement | null>(null)
    const {signUp, isRequestLoading} = useAuth();
    const handlePersonalInformationFormSubmit = async (event: FormEvent) => {
        event.preventDefault()

        let requestData = {
            name: fullNameRef.current?.value ?? "",
            phoneNumber: user.phoneNumber ?? "",
        }

        let result = await signUp(requestData)

        if (result) {
            navigate("/home",{replace: true})
        }
    }
    return (
        <Paper>
            <form onSubmit={handlePersonalInformationFormSubmit}>
                <Grid container width={"100vw"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                    <Grid container direction={"column"} width={{xs: 350, md: 550}} justifyContent={"center"} alignItems={"center"} rowSpacing={3}>
                        <Grid item xs={12} width={{xs: 150, md: 200}}>
                            <Logo/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h1"}>{t("personalInformation")}</Typography>
                        </Grid>
                        <Grid item xs={12} width={{xs: 300, md: 400}} height={{xs: 100}}>
                            <TextField required label={t("fullName")} inputRef={fullNameRef}/>
                        </Grid>
                        <Grid item xs={12} width={{xs: 300, md: 400}} height={{xs: 100}}>
                            <TextField disabled label={t("phoneNumber")} value={user.phoneNumber ?? ""}/>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton loading={isRequestLoading} variant={"contained"} type={"submit"} sx={{width: "200px", height: "40px"}}>
                                {t("enter")}
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={12} width={"100%"}>
                            <Grid container justifyContent={"flex-start"} direction={"column"}>
                                <Grid item>
                                    <Typography variant={"subtitle2"} textAlign={"start"}>{t("disclaimer")}:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"subtitle2"} textAlign={"start"}>
                                        *&nbsp;&nbsp;&nbsp;&nbsp;{t("recordsInformation")}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"subtitle2"} textAlign={"start"}>
                                        *&nbsp;&nbsp;&nbsp;&nbsp;{t("makeSureInfoIsCorrect")}
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