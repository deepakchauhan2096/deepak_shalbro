import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/css/sidebar.css";
import "./assests/css/style.css";
import "./assests/css/graph.css";
import { MyContext } from "./context/Mycontext";
import AdminCreate from "./Admin/AdminCreate";
import AdminDashboard from "./Admin/AdminDashboard";
import CompanyMain from "./company/CompanyMain";
import AdminLogin from "./Admin/AdminLogin";
import EmployeeAttendance from "./employee/EmployeeAttendance";
import EmployeeLogin from "./employee/EmployeeLogin";
import Temp from "./Attendance/Temp";

function App() {
  const [auth, setAuth] = useState({
    operation: "",
    result: ""
  });

  const isAuthenticated = auth.operation === "successfull";

  const ProtectedRoute = ({ path, element }) => {
    if (isAuthenticated) {
      return element; // Use the provided element directly
    } else {
      return <Navigate to="/login" replace />;
    }
  };

  console.log(auth.operation, "op");

  return (
    <div className="wrapper" style={{ overflowX: "scroll", overflow: "hidden" }}>
      <ToastContainer />
      <MyContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/signup" element={<AdminCreate />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/" element={<AdminLogin />} />

            {/* Protected routes */}
            <Route path="/admin/*" element={<ProtectedRoute path="/admin/*" element={<AdminDashboard />} />} />
            <Route path="/company/*" element={<ProtectedRoute path="/company/*" element={<CompanyMain />} />} />
            <Route path="/employee/*" element={<ProtectedRoute path="/employee/*" element={<EmployeeAttendance />} />} />
            <Route path="/temp/*" element={<ProtectedRoute path="/temp/*" element={<Temp />} />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;
