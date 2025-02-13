import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { userStore } from "../store/UserStore";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

const AdminPage = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    userStore.loadUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      userStore.deleteUser(id);
    }
  };

  const handleProfile = () => {
    userStore.setDialogOpen(true);
  };

  const handleClose = () => {
    userStore.setDialogOpen(false);
  };

  const handleLogout = () => {
    userStore.setDialogOpen(false);
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Tooltip title="Profile" arrow>
            <PermIdentityTwoToneIcon
            onClick={handleProfile}
            className="cursor-pointer" />
          </Tooltip>
          <h1 className="text-2xl font-bold ">User Management</h1>
        </div>

        <Paper className="w-full mb-6">
          <TableContainer className="max-h-[600px]">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold bg-gray-50">Name</TableCell>
                  <TableCell className="font-bold bg-gray-50">Email</TableCell>
                  <TableCell className="font-bold bg-gray-50">Phone</TableCell>
                  {/* <TableCell className="font-bold bg-gray-50">Address</TableCell>
                  <TableCell className="font-bold bg-gray-50">Gender</TableCell>
                  <TableCell className="font-bold bg-gray-50">DOB</TableCell>
                  <TableCell className="font-bold bg-gray-50">Skills</TableCell>
                  <TableCell className="font-bold bg-gray-50">Experience</TableCell> */}
                  <TableCell className="font-bold bg-gray-50">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userStore.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link 
                        to={`/AdminView/${user.id}`}
                        className="text-sky-600  underline"
                      >
                        {`${user.firstname} ${user.lastname}`}
                      </Link>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    {/* <TableCell>{user.address}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{moment(user.dob).format('DD MMM YYYY')}</TableCell>
                    <TableCell>{user.skills}</TableCell>
                    <TableCell>
                      {user.hasExperience === "yes"
                        ? user.experience
                        : "No experience"}
                    </TableCell> */}
                    <TableCell>
                      <IconButton
                        sx={{ color: "black" }}
                        onClick={() => handleDelete(user.id)}
                        size="small"
                        className="hover:bg-red-50"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {userStore.users.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-gray-500"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={userStore.isDialogOpen} onClose={handleClose}>
          <DialogTitle>Logout</DialogTitle>
          <DialogContent>
            <div className="flex items-center gap-2 py-4">
              <LogoutIcon className="text-gray-600" />
              <p>Are you sure you want to logout?</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogout} color="error" variant="contained">
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
    
  );
});

export default AdminPage;
