import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddUserDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    address: "",
    skills: "",
    hasExperience: "",
    experience: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={formData.lastname}
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
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </div>

        <div className="flex gap-4 mb-4">
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
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
            value={formData.phoneNumber}
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
            value={formData.address}
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
            value={formData.skills}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <FormControl fullWidth required>
            <InputLabel>Experience</InputLabel>
            <Select
              value={formData.hasExperience}
              onChange={handleInputChange}
              label="Experience"
             name="hasExperience"
             className="mb-4"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {formData.hasExperience === "yes" && (
            <TextField
              fullWidth
              label="Experience"
              name="experience"
              multiline
              rows={2}
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outlined">Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUserDetails;
