import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import EmployeePage from "./component/EmployeePage";
import AdminPage from "./component/AdminPage";
import AddUserDetails from "./component/AddUserDetails ";


function App() {
  useEffect(() => {
    const userCredentials = {
      employees: [
        { email: "emp1@gmail.com", password: "Emp@1234" },
        { email: "emp2@gmail.com", password: "Emp@2345" },
        { email: "emp3@gmail.com", password: "Emp@3456" },
        { email: "emp4@gmail.com", password: "Emp@4567" },
        { email: "emp5@gmail.com", password: "Emp@5678" },
      ],
      admins: [
        { email: "admin1@gmail.com", password: "Admin@1234" },
        { email: "admin2@gmail.com", password: "Admin@2345" },
        { email: "admin3@gmail.com", password: "Admin@3456" },
        { email: "admin4@gmail.com", password: "Admin@4567" },
        { email: "admin5@gmail.com", password: "Admin@5678" },
      ],
    };
    localStorage.setItem("userCredentials", JSON.stringify(userCredentials));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employe" element={<EmployeePage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/add-details" element={<AddUserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
