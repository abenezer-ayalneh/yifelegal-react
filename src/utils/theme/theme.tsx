import {useEffect, useMemo, useState} from 'react'
// @mui
import {CssBaseline, ThemeOptions} from '@mui/material'
import {createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider} from '@mui/material/styles'
//
import palette from './palette'
import shadows from './shadows'
import GlobalStyles from './globalStyles'
import componentsOverride from './overrides'
import customShadows from './customShadows'
import i18next from "i18next";
import typography from "./typography";
import {useAppSelector} from "../hooks/redux-hooks";

declare module '@mui/material/styles' {
    // allow configuration using `createTheme`
    interface ThemeOptions {
        customShadows?: {
            z1: string,
            z4: string,
            z8: string,
            z12: string,
            z16: string,
            z20: string,
            z24: string,
            primary: string,
            info: string,
            secondary: string,
            success: string,
            warning: string,
            error: string,
            card: string,
            dialog: string,
            dropdown: string,
        },
    }
}

// ----------------------------------------------------------------------
export default function ThemeProvider({children}: { children: JSX.Element }) {
    const customizationState = useAppSelector((state) => state.customization)

    const themeOptions: ThemeOptions = useMemo(
        (): ThemeOptions => ({
            palette,
            shape: {borderRadius: 6},
            typography:{
                ...typography,
                fontFamily: customizationState.fontFamily
            },
            shadows: shadows(),
            customShadows: customShadows(),
        }), [customizationState]
    )

    const theme = createTheme(themeOptions)
    theme.components = componentsOverride(theme)

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline/>
                <GlobalStyles/>
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    )
}
