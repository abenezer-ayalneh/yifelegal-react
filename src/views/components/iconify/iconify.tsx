import {forwardRef} from 'react';
// icons
import {Icon} from '@iconify/react';
// @mui
import {Box, SxProps} from '@mui/material';

// ----------------------------------------------------------------------
interface IconifyPropTypes {
    icon: string,
    width?: number,
    sx?: SxProps,
}

const Iconify = forwardRef(({icon, width = 20, sx, ...other}: IconifyPropTypes, ref) => (<Box ref={ref} component={Icon} icon={icon} sx={{width, height: width, ...sx}} {...other} />));

export default Iconify;
