import React from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { userStore } from "../store/UserStore";
import { Tooltip, Typography } from "@mui/material";
import moment from "moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PersonIcon from "@mui/icons-material/Person";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const AdminView = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = userStore.users.find((u) => u.id === id);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center ml-2">
          <Tooltip title="Back">
            <div onClick={() => navigate(-1)} className="cursor-pointer mb-3">
              <ArrowBackIosIcon sx={{ fontSize: 18 }} />
            </div>
          </Tooltip>
          <Typography variant="h5" component="h1" fontWeight="bold" mb={1}>
            {`${user.firstname} ${user.lastname}'s Information`}
          </Typography>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap -mx-3">
            <div className="w-1/2 px-3 mb-4">
              <div className="flex items-center space-x-3">
                <span >
                  <PersonIcon />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-600">First Name</h3>
                  <p className="text-lg">{user.firstname}</p>
                </div>
              </div>
            </div>

            <div className="w-1/2 px-3 mb-4">
              <div className="flex items-center space-x-3">
                <PersonIcon />
                <div>
                  <h3 className="font-semibold text-gray-600">Last Name</h3>
                  <p className="text-lg ">{` ${user.lastname}`}</p>
                </div>
              </div>
            </div>

            <div className="w-1/2 px-3 mb-4">
              <div className="flex items-center space-x-3">
                <MailLockOutlinedIcon />
                <div>
                  <h3 className="font-semibold text-gray-600">Email</h3>
                  <p className="text-lg ">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="w-1/2 px-3 mb-4">
              <div className="flex items-center space-x-3">
                <LocalPhoneOutlinedIcon />
                <div>
                  <h3 className="font-semibold text-gray-600">Phone Number</h3>
                  <p className="text-lg ">{user.phoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="w-1/2 px-3 mb-4">
              <div className="flex items-center space-x-3">
                <CalendarMonthOutlinedIcon />
                <div>
                  <h3 className="font-semibold text-gray-600">Date of Birth</h3>
                  <p className="text-lg">
                    {moment(user.dob).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-1/2 px-3 mb-4">
              <div className="flex items-center space-x-3">
                <Diversity3Icon />
                <div>
                  <h3 className="font-semibold text-gray-600">Gender</h3>
                  <p className="text-lg">{user.gender}</p>
                </div>
              </div>
            </div>

            <div className="w-1/2 px-3 mb-4">
              <div className="flex items-center space-x-3">
                <MenuBookOutlinedIcon />
                <div>
                  <h3 className="font-semibold text-gray-600">Skills</h3>
                  <p className="text-lg">{user.skills}</p>
                </div>
              </div>
            </div>

            <div className="w-1/2 px-3 mb-4">
              <div className="flex items-center space-x-3">
                <WorkOutlineIcon />
                <div>
                  <h3 className="font-semibold text-gray-600">Experience</h3>
                  <p className="text-lg">
                    {user.hasExperience === "yes"
                      ? user.experience
                      : "No experience"}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full px-3 mb-4">
              <div className="flex items-center space-x-3">
                <LocationOnOutlinedIcon />
                <div>
                  <h3 className="font-semibold text-gray-600">Address</h3>
                  <p className="text-lg">{user.address}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminView;
