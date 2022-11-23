// @flow
import * as React from 'react';
import MUITextFiled from "@mui/material/TextField"
import {BaseTextFieldProps} from "@mui/material/TextField/TextField";
import {FC} from "react";

export const TextField: FC<BaseTextFieldProps> = ({...restProps}) => {
    return (
        <MUITextFiled
            {...restProps}

            /* styles the wrapper */
            style={{ height:50, width:"100%",}}

            /* styles the label component */
            InputLabelProps={{
                style: {
                    height:50,
                    fontSize:16,
                    top: "-3px"
                },
            }}

            /* styles the input component */
            inputProps={{
                style: {
                    height:50,
                    padding: '0px 14px',
                    fontSize:18
                },
            }}
        />
    );
};