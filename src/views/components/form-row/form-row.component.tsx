import React from "react";
import RequiredAstrix from "../required-span/required-span.component";
import {Grid, GridProps, Typography} from "@mui/material";

type FormRowPropTypes = {
    label?: string,
    required?: boolean,
    children: JSX.Element
}

const FormRow: React.FunctionComponent<FormRowPropTypes & GridProps> = ({ label, required = false, children, ...rest}) => (
    <Grid item {...rest}>
        <Grid container columnSpacing={1} columns={12}>
            <Grid item xs={12} md={4}>
                <Grid container justifyContent={{xs: "flex-start", md: "flex-end"}} alignItems="center" minHeight="35px">
                    <Typography variant={"body2"}>
                        {label}
                    </Typography>
                    {
                        required && <RequiredAstrix/>
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} md={8} display={"flex"} width={"100%"} alignItems={"center"} justifyContent={"left"}>
                <Grid item xs={12} md={8}>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default FormRow;