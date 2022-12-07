import PropTypes from 'prop-types';
// @mui
import {styled} from '@mui/material/styles';
import {AppBar, Box, Breadcrumbs, IconButton, Stack, Toolbar} from '@mui/material';
// utils
import {bgBlur} from '../../../utils/css/css-styles';
import LanguagePopover from "../popovers/language-popover";
import Searchbar from "../search-bar/search-bar";
import Iconify from "../iconify/iconify";
import AccountPopover from "../popovers/account-popover";
import {IconChevronRight} from "@tabler/icons";
import React, {ReactNode, useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
// import NotificationsPopover from "./NotificationsPopover";
// components
// import Iconify from '../../../components/iconify/Iconify';
//
// import SearchBar from './SearchBar';
// import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 60;

const HEADER_DESKTOP = 70;

const StyledRoot = styled(AppBar)(({theme}) => ({
    ...bgBlur({color: theme.palette.background.default}),
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    },
}));

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
    onOpenNav: PropTypes.func,
};

export default function Header({onOpenNav}: { onOpenNav: () => void }) {
    let location = useLocation();
    const breadCrumb: ReactNode[] = useMemo<ReactNode[]>(() => {
        let breadcrumbArray: ReactNode[] = []
        location.pathname.substring(1).split("/").reduce((previousValue: string, currentValue: string, currentIndex: number) => {
            breadcrumbArray.push(<Link to={`${previousValue}/${currentValue}`}>{currentValue}</Link>)
            return "";
        })

        return breadcrumbArray
    }, [location])
    return (
        <StyledRoot>`
            <StyledToolbar>
                <IconButton
                    onClick={onOpenNav}
                    sx={{
                        mr: 1,
                        color: 'text.primary',
                        display: {lg: 'none'},
                    }}
                >
                    <Iconify icon="eva:menu-2-fill"/>
                </IconButton>

                <Searchbar/>
                <Box sx={{flexGrow: 1}}/>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{
                        xs: 0.5,
                        sm: 1,
                    }}
                >
                    <LanguagePopover/>
                    {/*<NotificationsPopover />*/}
                    <AccountPopover/>
                </Stack>
                {/*Breadcrumb*/}
            </StyledToolbar>
            <Stack paddingX={5} paddingY={1}>
                <Breadcrumbs aria-label="breadcrumb" maxItems={4} separator={<IconChevronRight size={20}/>}>
                    {
                        console.log(breadCrumb)
                    }
                </Breadcrumbs>
            </Stack>
        </StyledRoot>
    );
}
