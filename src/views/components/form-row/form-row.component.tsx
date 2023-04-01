import React from "react";
import RequiredAstrix from "../required-span/required-span.component";
import {Grid, GridProps, Typography} from "@mui/material";

type FormRowPropTypes = {
    id?: string,
    label?: string | undefined | null,
    required?: boolean,
    labelFontStyle?: "h5" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined,
    children: JSX.Element
}

const FormRow = ({id, label, required, children, labelFontStyle = "h5", ...rest}: FormRowPropTypes & GridProps) => (
    <Grid item xs={12} {...rest}>
        <Grid container columnSpacing={1} columns={12}>
            <Grid item xs={12} md={4}>
                <Grid container justifyContent={{xs: "flex-start", md: "flex-end"}} textAlign={{xs: "left", md: "right"}} alignItems="center" minHeight="25px">
                    {/*<label htmlFor={id} style={{textAlign: "right"}}>*/}
                        <Typography minWidth={100} variant={labelFontStyle}>
                            {label}
                            {
                                required && <RequiredAstrix/>
                            }
                        </Typography>
                    {/*</label>*/}
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container justifyContent={"flex-start"} alignItems="center" minHeight={"25px"}>
                    <Grid item textAlign={"left"} xs={8}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default FormRow;