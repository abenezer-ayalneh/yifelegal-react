// @flow
import * as React from 'react';
import {FC} from 'react';
import MUITextFiled from "@mui/material/TextField"
import {BaseTextFieldProps} from "@mui/material/TextField/TextField";

type TextInputProps = {
    size: "small" | "normal",
}
export const TextField: FC<BaseTextFieldProps & TextInputProps> = ({size, ...restProps}) => {
    return (
        <MUITextFiled
            {...restProps}

            /* styles the wrapper */
            style={{height: size === "small" ? 40 : 50, width: "100%",}}

            /* styles the label component */
            InputLabelProps={{
                style: {
                    padding: 0,
                    margin: 0,
                    height: size === "small" ? 12 : 50,
                    minWidth: "20px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                    top: size === "small" ? "-3px" : "0"
                },
            }}

            /* styles the input component */
            inputProps={{
                style: {
                    height: size === "small" ? 40 : 50,
                    padding: '0px 14px',
                    fontSize: 14
                },
            }}
        />
    );
};