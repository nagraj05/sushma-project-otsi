import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import EmployeePage from "./component/EmployeePage";
import AdminPage from "./component/AdminPage";
import AddUserDetails from "./component/AddUserDetails ";
import AdminView from "./component/AdminView";

function App() {
  useEffect(() => {
    const userCredentials = {
      employees: [
        { id: 1, email: "emp1@gmail.com", password: "Emp@12345" },
        { id: 2, email: "emp2@gmail.com", password: "Emp@23456" },
        { id: 3, email: "emp3@gmail.com", password: "Emp@34567" },
        { id: 4, email: "emp4@gmail.com", password: "Emp@45678" },
        { id: 5, email: "emp5@gmail.com", password: "Emp@56789" },
      ],
      admins: [
        { email: "admin1@gmail.com", password: "Admin@12345" },
      ],
    };
    localStorage.setItem("userCredentials", JSON.stringify(userCredentials));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employe/:id" element={<EmployeePage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/add-details/:id" element={<AddUserDetails />} />
          <Route path="/AdminView/:id" element={<AdminView/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
