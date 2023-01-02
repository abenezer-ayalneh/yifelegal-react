// @flow
import * as React from 'react';
import {FC} from 'react';
import MUITextFiled from "@mui/material/TextField"
import {BaseTextFieldProps} from "@mui/material/TextField/TextField";
import {SelectProps} from "@mui/material";

export const TextField: FC<BaseTextFieldProps> = ({size = "small", ...restProps}) => {
    return (
        <MUITextFiled
            {...restProps}
            /* styles the wrapper */
            style={{width: "100%", fontSize: 14}}
            size={size}
            /* styles the label component */
            InputLabelProps={{
                style: {
                    fontSize: 14,
                },
            }}
            /* styles the input component */
            inputProps={{
                style: {
                    padding: '10px 14px',
                    fontSize: 14,
                },
            }}
        />
    );
};