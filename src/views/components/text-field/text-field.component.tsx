// @flow
import * as React from 'react';
import {FC} from 'react';
import MUITextFiled from "@mui/material/TextField"
import {BaseTextFieldProps} from "@mui/material/TextField/TextField";

type TextInputProps = {
    size: "small" | "normal",
}
export const TextField: FC<BaseTextFieldProps & TextInputProps> = ({size = "normal", ...restProps}) => {
    return (
        <MUITextFiled
            {...restProps}

            /* styles the wrapper */
            style={{height: size === "small" ? 40 : 50, width: "100%",}}

            /* styles the label component */
            InputLabelProps={{
                style: {
                    height: size === "small" ? 40 : 50,
                    fontSize: 14,
                    top: size === "small" ? "-7px" : "-3px"
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