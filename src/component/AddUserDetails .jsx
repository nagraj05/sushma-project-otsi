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
    experience: "",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className=" w-2xl p-6 bg-white rounded-lg shadow-lg">
    <div className="mt-8 px-6">
      <h2 className="text-2xl font-semibold mb-6">Add User Details</h2>
   
        <div className="flex flex-wrap gap-4">
            <div className="w-full gap-4 flex justify-between">
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={formData.firstname}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            required
          />
          </div>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            required
          />
          <TextField
            fullWidth
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            InputLabelProps={{ shrink: true }}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              required
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
            required
          />
        </div>
        <div className="mt-4">
          <TextField
            fullWidth
            label="Address"
            name="address"
            multiline
            rows={2}
            value={formData.address}
            required
          />
        </div>
        <div className="mt-4">
          <TextField
            fullWidth
            label="Skills"
            name="skills"
            multiline
            rows={2}
            value={formData.skills}
            required
          />
        </div>
        <div className="mt-4">
          <TextField
            fullWidth
            label="Experience"
            name="experience"
            multiline
            rows={2}
            value={formData.experience}
            required
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outlined" onClick={() => navigate("/employe")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
        </div>
        </div>
    </div>
  );
};

export default AddUserDetails;
