import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { addUserStore } from "../store/AddUserStore";
import { userStore } from "../store/UserStore";
import employeeStore from "../store/EmployeeStore ";

const AddUserDetails = observer(() => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    addUserStore.setField(name, value);
  };

  const handleDateChange = (date) => {
    addUserStore.setField("dob", date ? moment(date).format('DD MMM YYYY') : "");
  };

  const handleSubmit = () => {
    try {
      // Validate form data
      addUserStore.validateForm();
      
      // Create a new user object with a unique ID
      const newUser = {
        ...addUserStore.formData,
        id: Date.now().toString(), // Add a unique ID
      };
      
      // Save to both stores
      userStore.addUser(newUser);
      employeeStore.updateProfile(newUser);
      
      
      // Navigate to employee page
      navigate('/employe');
    } catch (err) {
      setError(err.message);
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

 

  const handleCancel = () => {
    addUserStore.resetForm();
    navigate('/employe');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Add User Details</h2>

        <div className="flex gap-4 mb-4">
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={addUserStore.formData.firstname}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={addUserStore.formData.lastname}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex gap-4 mb-4">
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={addUserStore.formData.email}
            onChange={handleInputChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date of Birth"
              value={addUserStore.formData.dob ? moment(addUserStore.formData.dob) : null}
              onChange={handleDateChange}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </div>

        <div className="flex gap-4 mb-4">
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              value={addUserStore.formData.gender}
              onChange={handleInputChange}
              label="Gender"
              name="gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={addUserStore.formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            label="Address"
            name="address"
            multiline
            rows={2}
            value={addUserStore.formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            label="Skills"
            name="skills"
            multiline
            rows={2}
            value={addUserStore.formData.skills}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <FormControl fullWidth required>
            <InputLabel>Experience</InputLabel>
            <Select
              value={addUserStore.formData.hasExperience}
              onChange={handleInputChange}
              label="Experience"
             name="hasExperience"
             className="mb-4"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {addUserStore.formData.hasExperience === "yes" && (
            <TextField
              fullWidth
              label="Experience Details"
              name="experience"
              multiline
              rows={2}
              value={addUserStore.formData.experience}
              onChange={handleInputChange}
              required
              className="mt-4"
            />
          )}
        </div>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <div className="flex justify-end gap-4">
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
});

export default AddUserDetails;
