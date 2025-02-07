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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address (must contain @ and .com)");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleLogin = () => {
    const origin = localStorage.getItem("Origin");

    if (origin === "login") {
      if (email === "admin@gmail.com" && password === "admin@12345") {
        navigate("/AdminPage");
      } else if (email === "employe@gmail.com" && password === "employe@12345") {
        navigate("/employe");
      } else {
        setLoginError("Invalid User"); 
      }
    }
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
            onBlur={() => validateEmail(email)}
            error={!!emailError}
            helperText={emailError}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <div 
            className="absolute right-3 top-1/2  cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center flex-col  gap-3">
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