import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import config from "../../../../config";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { UserType } from "../../../../utils/types/user-type";
import moment from "moment";
import useSend from "../../../../utils/hooks/use-send";
import LoadingButton from "@mui/lab/LoadingButton";
import FullscreenLoadingAnimation from "../../../components/fullscreen-loading-animation/fullscreen-loading-animation";
const ROOT_URL = import.meta.env.VITE_ROOT_URL;
const UsersListPage = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [selectedUserStatus, setSelectedUserStatus] = useState<
    true | false | null
  >(null);
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const { sendRequest: fetchUsers, isRequestLoading: isFetchingUsers } =
    useSend({
      method: "GET",
      url: ROOT_URL + "users",
    });

  const {
    sendRequest: changeUserActiveStatus,
    isRequestLoading: isActiveStatusChanging,
  } = useSend({
    method: "POST",
    url: ROOT_URL + "users/changeActiveStatus",
  });

  const updateUsersList = () =>
    fetchUsers().then((result) => setUsersList(result?.data?.users));

  useEffect(() => {
    updateUsersList();
  }, []);

  const handleDialogOpen = (
    event: ChangeEvent<HTMLInputElement>,
    user: UserType
  ) => {
    setSelectedUser(user);
    setSelectedUserStatus(event.target.checked);
  };

  const handleDialogClose = () => {
    setSelectedUser(null);
    setSelectedUserStatus(null);
  };

  const handleUserActiveStatusChange = () => {
    changeUserActiveStatus(
      {
        data: {
          userID: selectedUser?.id,
          status: selectedUserStatus,
        },
      },
      true
    ).then((result) => {
      if (result.status) {
        handleDialogClose();
        updateUsersList();
      }
    });
  };

  const rows = useMemo(() => usersList, [usersList]);
  return (
    <Grid container paddingX={3}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? (
            rows.map((row: UserType) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.phone_number}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  {moment(row.created_at).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell align="center">
                  {row.deleted_at ? (
                    <Chip
                      label={"In-Active"}
                      color={"error"}
                      size={"small"}
                      variant={"outlined"}
                    />
                  ) : (
                    <Chip
                      label={"Active"}
                      color={"success"}
                      size={"small"}
                      variant={"outlined"}
                    />
                  )}
                  <Switch
                    checked={Boolean(!row.deleted_at)}
                    onChange={(event) => handleDialogOpen(event, row)}
                    size={"small"}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <FullscreenLoadingAnimation />
          )}
        </TableBody>
      </Table>
      {selectedUser && (
        <Dialog
          open={Boolean(selectedUser)}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant={"h5"}>Status Change</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant={"body2"}>
                Are you sure you want to change the status of this user?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDialogClose}
              variant={"text"}
              color={"error"}
            >
              No
            </Button>
            <LoadingButton
              onClick={handleUserActiveStatusChange}
              autoFocus
              variant={"text"}
              loading={isActiveStatusChanging}
              color={"primary"}
            >
              Yes
            </LoadingButton>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};

export default UsersListPage;
