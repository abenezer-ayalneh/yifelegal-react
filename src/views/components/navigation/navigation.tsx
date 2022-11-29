import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
// @mui
import {alpha, styled} from '@mui/material/styles';
import {Avatar, Box, Button, Drawer, Link, Stack, Typography} from '@mui/material';
// mock
import account from '../../../utils/_mock/account';
// hooks
import useResponsive from '../../../utils/hooks/useResponsive';
// components
import navConfig from './config';
import Logo from '../logo/logo.component';
import Scrollbar from '../scrollbar/scrollbar.component'
import NavSection from "../nav-section/nav-section.component";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

interface NavPropTypes {
    openNav: boolean,
    onCloseNav: () => void,
}

export default function Nav({openNav, onCloseNav}: NavPropTypes) {
    const {pathname} = useLocation();

    const isDesktop = useResponsive('up', 'lg');

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {height: 1, display: 'flex', flexDirection: 'column'},
            }}
        >
            <>
                <Box sx={{px: 2.5, py: 3, display: 'inline-flex'}}>
                    <Logo size={40}/>
                </Box>

                <Box sx={{mb: 5, mx: 2.5}}>
                    <Link underline="none">
                        <StyledAccount>
                            <Avatar src={account.photoURL} alt="photoURL"/>

                            <Box sx={{ml: 2}}>
                                <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '10rem'}}>
                                    <Typography variant="subtitle2" sx={{color: 'text.primary'}} noWrap>
                                        {account.displayName}
                                    </Typography>
                                </div>

                                <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '10rem'}}>
                                    <Typography noWrap={true} variant={"subtitle2"} sx={{color: 'text.primary'}}>
                                        {account.email}
                                    </Typography>
                                </div>
                            </Box>
                        </StyledAccount>
                    </Link>
                </Box>

                <NavSection data={navConfig}/>
            </>
        </Scrollbar>
    );

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: {lg: 0},
                width: {lg: NAV_WIDTH},
            }}
        >
            {isDesktop ? (
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: NAV_WIDTH,
                            bgcolor: 'background.default',
                            borderRightStyle: 'dashed',
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        sx: {width: NAV_WIDTH},
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    );
}
