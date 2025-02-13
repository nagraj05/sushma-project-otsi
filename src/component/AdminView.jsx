import React from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { userStore } from "../store/UserStore";
import { Button, Typography } from "@mui/material";
import moment from "moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AdminView = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = userStore.users.find((u) => u.id === id);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center ml-2">
          <div onClick={() => navigate(-1)} className="cursor-pointer mb-4">
            <ArrowBackIosIcon sx={{ fontSize: 20 }} />
          </div>

          <Typography variant="h5" component="h1" fontWeight="bold" mb={1}>
            Admin View
          </Typography>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap -mx-3">
            <div className="w-1/2 px-3 mb-4">
              <h3 className="font-semibold text-gray-600">First Name</h3>
              <p className="text-lg">{` ${user.firstname}`}</p>
            </div>
            <div className="w-1/2 px-3 mb-4">
              <h3 className="font-semibold text-gray-600">Last Name</h3>
              <p className="text-lg">{` ${user.lastname}`}</p>
            </div>
            <div className="w-1/2 px-3 mb-4">
              <h3 className="font-semibold text-gray-600">Email</h3>
              <p className="text-lg">{user.email}</p>
            </div>
            <div className="w-1/2 px-3 mb-4">
              <h3 className="font-semibold text-gray-600">Phone Number</h3>
              <p className="text-lg">{user.phoneNumber}</p>
            </div>
            <div className="w-1/2 px-3 mb-4">
              <h3 className="font-semibold text-gray-600">Date of Birth</h3>
              <p className="text-lg">
                {moment(user.dob).format("DD MMM YYYY")}
              </p>
            </div>
            <div className="w-1/2 px-3 mb-4">
              <h3 className="font-semibold text-gray-600">Gender</h3>
              <p className="text-lg">{user.gender}</p>
            </div>
            <div className="w-full px-3 mb-4">
              <h3 className="font-semibold text-gray-600">Address</h3>
              <p className="text-lg">{user.address}</p>
            </div>
            <div className="w-full px-3 mb-4">
              <h3 className="font-semibold text-gray-600">Skills</h3>
              <p className="text-lg">{user.skills}</p>
            </div>
            <div className="w-full px-3 mb-4">
              <h3 className="font-semibold text-gray-600">Experience</h3>
              <p className="text-lg">
                {user.hasExperience === "yes"
                  ? user.experience
                  : "No experience"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminView;
