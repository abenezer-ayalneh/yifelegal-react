import React from "react";
import RequiredAstrix from "../required-span";
import {Grid, Typography} from "@mui/material";

const SmallFormRow = ({id, label, labelFontStyle = "h5", required, children}) => (
    <Grid item xs={12}>
        <Grid container columnSpacing={1}>
            {
                label && <Grid item xs={12}>
                    <Grid container justifyContent="flex-start" alignItems="center" minHeight="35px">
                        <label htmlFor={id}>
                            <Typography variant={labelFontStyle}>
                                {label}
                            </Typography>
                            {
                                required && <RequiredAstrix/>
                            }
                        </label>
                    </Grid>
                </Grid>
            }
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    </Grid>
);
export default SmallFormRow;