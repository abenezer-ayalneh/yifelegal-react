import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
// @mui
import { Box, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

const SvgColor = forwardRef(({ src, sx, ...other }: {src?: string,sx?: SxProps}, ref: React.Ref<HTMLInputElement>) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

export default SvgColor;
