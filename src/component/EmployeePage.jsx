import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import employeeStore from "../store/EmployeeStore ";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
const EmployeePage = observer(() => {
  const navigate = useNavigate();

  const handleAdddetails = () => {
    navigate("/add-details");
  };

  const handleProfile = () => {
    employeeStore.setDialogOpen(true);
  };

  const handleClose = () => {
    employeeStore.setDialogOpen(false);
  };

  const handleLogout = () => {
    employeeStore.clearProfileData();
    employeeStore.setDialogOpen(false);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <Tooltip title="Profile" arrow>
              <PermIdentityTwoToneIcon
                onClick={handleProfile}
                className="cursor-pointer"
              />
            </Tooltip>
            <h2 className="text-2xl font-bold">User Profile</h2>
          </div>
          <Button
            variant="contained"
            onClick={handleAdddetails}
            startIcon={<AddCircleIcon />}
          >
            Add Details
          </Button>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Firstname</p>
            <p className="text-gray-900">
              {employeeStore.profileData.firstname}
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Lastname</p>
            <p className="text-gray-900">
              {employeeStore.profileData.lastname}
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Email</p>
            <p className="text-gray-900">{employeeStore.profileData.email}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">DOB</p>
            <p className="text-gray-900">{employeeStore.profileData.dob}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Gender</p>
            <p className="text-gray-900">{employeeStore.profileData.gender}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Phone Number</p>
            <p className="text-gray-900">
              {employeeStore.profileData.phoneNumber}
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Address</p>
            <p className="text-gray-900">{employeeStore.profileData.address}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Skills</p>
            <p className="text-gray-900">{employeeStore.profileData.skills}</p>
          </div>
          {employeeStore.hasExperienceField && (
            <div className="border-b pb-2">
              <p className="text-gray-600 text-sm">Experience</p>
              <p className="text-gray-900">
                {employeeStore.profileData.experience}
              </p>
            </div>
          )}
        </div>

        <Dialog open={employeeStore.isDialogOpen} onClose={handleClose}>
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

export default EmployeePage;
