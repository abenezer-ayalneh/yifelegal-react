import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from '../../components/header/header';
import Nav from '../../components/navigation/navigation';
import SuccessSnackbar from "../../components/snackbars/success-snackbar.component";
import ErrorSnackbar from "../../components/snackbars/error-snackbar.component";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import {clearError} from "../../../utils/redux/slices/error-slice";
import {useDispatch} from "react-redux";
import {clearSuccess} from "../../../utils/redux/slices/success-slice";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 120;
const APP_BAR_DESKTOP = 120;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const success = useAppSelector((state) => state.success);
  const error = useAppSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleCloseErrorMessage = (event:React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearError());
  }

  const handleCloseSuccessMessage = (event:React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearSuccess());
  }

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>
        <Outlet />
      </Main>
      {
          success.message && <SuccessSnackbar success={success} handleCloseSuccessMessage={handleCloseSuccessMessage}/>
      }
      {
          error.message && <ErrorSnackbar error={error} handleCloseErrorMessage={handleCloseErrorMessage}/>
      }
    </StyledRoot>
  );
}
