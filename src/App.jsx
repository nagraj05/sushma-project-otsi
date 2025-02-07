import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./component/Login";
import EmployeePage from "./component/EmployeePage";
import AdminPage from "./component/AdminPage";
import AddUserDetails from "./component/AddUserDetails ";


function App() {
  useEffect(() => {
    localStorage.setItem("Origin", "login");
  }, []);
  return (
    <div>
<BrowserRouter>
<Routes>  
  <Route path="/" element={<Login/>}/>
  <Route path="/employe" element={<EmployeePage />}/>
  <Route path="/AdminPage" element={<AdminPage />}/>
  <Route path="/add-details" element={<AddUserDetails />}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;



