import PropTypes from 'prop-types';
import {NavLink as RouterLink} from 'react-router-dom';
// @mui
import {Box, List, ListItemText} from '@mui/material';
//
import {StyledNavItem, StyledNavItemIcon} from './nav-section.styles';

// ----------------------------------------------------------------------
export interface NavSectionPropTypes {
    icon: JSX.Element,
    path: string,
    title: string,
}

export default function NavSection({data, ...other}: { data: NavSectionPropTypes[] }) {
    return (
        <Box {...other}>
            <List disablePadding sx={{p: 1}}>
                {data.map((item) => (
                    <NavItem key={item.title} item={item}/>
                ))}
            </List>
        </Box>
    );
}

// ----------------------------------------------------------------------
function NavItem({item}: { item: NavSectionPropTypes }) {
    const {title, path, icon} = item;

    return (
        <StyledNavItem
            component={RouterLink}
            to={path}
            sx={{
                '&.active': {
                    color: 'text.primary',
                    bgcolor: 'action.selected',
                    fontWeight: 'fontWeightBold',
                },
            }}
        >
                <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

                <ListItemText disableTypography primary={title}/>

                {/*{info && info}*/}
        </StyledNavItem>
    );
}
