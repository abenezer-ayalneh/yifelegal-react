import {TypographyPropsVariantOverrides} from "@mui/material"

export function pxToRem(value: any) {
    return `${value / 16}rem`
}

export function responsiveFontSizes({xs, sm, md, lg}: { xs: number, sm: number, md: number, lg: number }) {
    return {
        '@media (max-width:599px)': {
            fontSize: pxToRem(xs),
        },
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm),
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md),
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg),
        },
    }
}

// ----------------------------------------------------------------------

const FONT_PRIMARY = 'Poppins, Public Sans, sans-serif' // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif' // Local Font

const typography: TypographyPropsVariantOverrides = {
    fontFamily: FONT_PRIMARY,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
        fontWeight: 700,
        color: "#212B36",
        lineHeight: 1.5,
        fontSize: pxToRem(34),
        // ...responsiveFontSizes({xs:52,sm: 52, md: 58, lg: 64}),
        ...responsiveFontSizes({xs: 28, sm: 36, md: 40, lg: 45}),
    },
    h2: {
        color: "#212B36",
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(24),
        // ...responsiveFontSizes({xs:40,sm: 40, md: 44, lg: 48}),
        ...responsiveFontSizes({xs: 28, sm: 21, md: 25, lg: 30}),
    },
    h3: {
        color: "#212B36",
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(20),
        // ...responsiveFontSizes({xs:26,sm: 26, md: 30, lg: 32}),
        ...responsiveFontSizes({xs: 14, sm: 14, md: 18, lg: 20}),
    },
    h4: {
        color: "#212B36",
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(16),
        // ...responsiveFontSizes({xs:20,sm: 20, md: 24, lg: 24}),
        ...responsiveFontSizes({xs: 12, sm: 12, md: 16, lg: 16}),
    },
    h5: {
        color: "#212B36",
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(14),
        // ...responsiveFontSizes({xs:19,sm: 19, md: 20, lg: 20}),
        ...responsiveFontSizes({xs: 13, sm: 13, md: 14, lg: 14}),
    },
    h6: {
        color: "#212B36",
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
        // ...responsiveFontSizes({xs:18,sm: 18, md: 18, lg: 18}),
        ...responsiveFontSizes({xs: 12, sm: 12, md: 12, lg: 12}),
    },
    subtitle1: {
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
    },
    subtitle2: {
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: pxToRem(14),
    },
    body1: {
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: pxToRem(20),
    },
    body2: {
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: pxToRem(14),
    },
    caption: {
        lineHeight: 1.5,
        fontSize: pxToRem(12),
    },
    overline: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
        textTransform: 'uppercase',
    },
    button: {
        fontWeight: 500,
        lineHeight: 24.5 / 14,
        fontSize: pxToRem(14),
        textTransform: 'capitalize',
    },
}

export default typography
