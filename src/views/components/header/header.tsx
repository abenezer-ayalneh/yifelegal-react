import PropTypes from 'prop-types';
// @mui
import {styled} from '@mui/material/styles';
import {AppBar, Box, Breadcrumbs, IconButton, Link, Stack, Toolbar, Typography} from '@mui/material';
// utils
import {bgBlur} from '../../../utils/css/css-styles';
import LanguagePopover from "../popovers/language-popover";
import Searchbar from "../search-bar/search-bar";
import Iconify from "../iconify/iconify";
import AccountPopover from "../popovers/account-popover";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
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

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

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
    const breadcrumb = useAppSelector((state) => state.breadCrumb)
    return (
        <StyledRoot>
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
            </StyledToolbar>
            <Stack spacing={2} bgcolor={"red"} paddingLeft={6}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumb.breadcrumb}
                </Breadcrumbs>
            </Stack>
        </StyledRoot>
    );
}
