import { Button, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validateEmail = (value) => {
    if (!value) return true; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    setLoginError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setLoginError(""); // Clear login error when password is changed
  };

  const handleInputFocus = () => {
    setLoginError("");
  };

  const handleLogin = () => {
    if (!email || !password) return setLoginError("Please enter both email and password");
    if (!validateEmail(email)) return;
    const { employees, admins } = JSON.parse(localStorage.getItem("userCredentials")) || {};

    // Check employees and store ID
    const employeeUser = employees?.find(
      (user) => user.email === email && user.password === password
    );
    if (employeeUser) {
      localStorage.setItem("currentUserId", employeeUser.id);
      navigate(`/employe/${employeeUser.id}`);
      return;
    }

    // Check admins
    if (
      admins?.some((user) => user.email === email && user.password === password)
    ) {
      navigate("/AdminPage");
      return;
    }

    setLoginError("Invalid email or password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <div className="text-center mb-6 text-2xl font-bold text-gray-800">
          Login Page
        </div>
        <div className="mb-4">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            onFocus={handleInputFocus}
            onBlur={() => validateEmail(email)}
            error={!!emailError}
            helperText={emailError}
            required
          />
        </div>
        <div className="mb-4 relative">
        <TextField
            id="password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            onFocus={handleInputFocus}
            required
          />
          <div 
            className="absolute right-3 top-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center flex-col gap-3">
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleLogin}
          >
            Login
          </Button>
          {loginError && (
            <Typography color="error">
              {loginError}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}