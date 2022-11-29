import {useMemo} from 'react'
// @mui
import {CssBaseline, CssBaselineProps, ThemeOptions} from '@mui/material'
import {createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider} from '@mui/material/styles'
//
import palette from './palette'
import shadows from './shadows'
import typography from './typography'
import GlobalStyles from './globalStyles'
import componentsOverride from './overrides'
import customShadows from './customShadows'

declare module '@mui/material/styles' {
    // allow configuration using `createTheme`
    interface ThemeOptions {
        customShadows?: {
            z1:string,
            z4:string,
            z8:string,
            z12:string,
            z16:string,
            z20:string,
            z24:string,
            primary:string,
            info:string,
            secondary:string,
            success:string,
            warning:string,
            error:string,
            card:string,
            dialog:string,
            dropdown:string,
        },
    }
}

// ----------------------------------------------------------------------
export default function ThemeProvider({children}: { children: JSX.Element }) {
    const themeOptions: ThemeOptions = useMemo(
        (): ThemeOptions => ({
            palette,
            shape: {borderRadius: 6},
            typography,
            shadows: shadows(),
            customShadows: customShadows(),
        }),[]
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
