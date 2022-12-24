import React, {useState} from 'react';
import LanguageIcon from "../../../assets/icons/language.svg"
// @mui
import {alpha} from '@mui/material/styles';
import {Box, IconButton, MenuItem, Popover, Stack, Typography, useTheme} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/redux-hooks";
import {useTranslation} from "react-i18next";
import {setFontFamily} from "../../../utils/redux/slices/customization-slice";

// ----------------------------------------------------------------------

const LANGS = [
    {
        value: 'en',
        label: 'English',
        icon: '/assets/icons/ic_flag_en.svg',
    },
    {
        value: 'am',
        label: 'አማርኛ',
        icon: '/assets/icons/ic_flag_de.svg',
    },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
    const [open, setOpen] = useState<HTMLButtonElement | null>(null);
    const {i18n} = useTranslation()
    const dispatch = useAppDispatch()

    const handleLanguageChange = (chosenLanguage: string) => {
        if (chosenLanguage === "am") {
            dispatch(setFontFamily({fontFamily: "Nyala, Public Sans, sans-serif"}))
        } else {
            dispatch(setFontFamily({fontFamily: "Poppins, Public Sans, sans-serif"}))
        }
        i18n.changeLanguage(chosenLanguage).then(() => handleClose());
    }

    const handlePopoverToggle: React.MouseEventHandler<HTMLButtonElement> | undefined = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            <IconButton
                onClick={handlePopoverToggle}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                    ...(open && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                    }),
                }}
            >
                <img src={LanguageIcon} alt={"language"} style={{width: "30px"}}/>
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                PaperProps={{
                    sx: {
                        p: 1,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Stack spacing={0.75}>
                    {LANGS.map((option) => (
                        <MenuItem key={option.value} selected={option.value === i18n.language} onClick={() => handleLanguageChange(option.value)}>
                            {/*<Box component="img" alt={option.label} src={option.icon} sx={{width: 28, mr: 2}}/>*/}
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>
            </Popover>
        </>
    );
}
