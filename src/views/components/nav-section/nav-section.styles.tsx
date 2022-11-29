// @mui
import { styled } from '@mui/material/styles';
import {ListItemIcon, ListItemButton, Box} from '@mui/material';

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)((props) => ({
  ...props.theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: props.theme.palette.text.secondary,
  borderRadius: props.theme.shape.borderRadius,
})) as typeof Box;

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});