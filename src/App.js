import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/css/sidebar.css";
import "./assests/css/style.css";
import "./assests/css/graph.css";
import AdminDashboard from "./Admin/AdminDashboard";
import EmployeeAttendance from "./employee/EmployeeAttendance";
import EmployeeLogin from "./employee/EmployeeLogin"
import EmployeeHistory from "./employee/EmployeeHistory";
import EmployeeDetail from "./employee/EmployeeDetail";
import CompanyDashboard from "./company/CompanyDashboard";
import Project from "./company/Project";
import EmployeeSrc from "./employee/EmployeeSrc";
import AttendanceReport from "./Attendance/AttendanceAcknowledge";
import Document from "./Document/Documents";
import Csc from "./components/Csc"
import Page404 from "./pages/Page404";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Admin from "./components/Admin";
import { auth } from "./firebase";
import SubContract from "./subcontract/SubContract";
import AdminLogin from "./Admin/AdminLogin";

function App() {


  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.email);
      } else setUserName("");
    });
  }, []);





  return (
    <div className="wrapper" style={{ overflowX: "scroll", overflow: "hidden" }}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/temp/*" element={<Csc />} />
            <Route path="/*" element={<Login />} />
            <Route path="/employee/login/*" element={<EmployeeLogin />} />
            <Route path="/signup/*" element={<Signup />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/rootuser" element={<AdminLogin />} />
            <Route path="/cs-admin/" element={<Admin />} />
            <Route path="/error/*" element={<Page404 />} />
            <Route path="/employee/*" element={<EmployeeDetail />} />
            <Route path="/employee/attendance/:latt/:lngi/:areas/:loca/:employees/:projects/:projectids/*" element={<EmployeeAttendance />} />
            <Route path="/employee/history/:*" element={<EmployeeHistory />} />
          {/* </>

          {userName ?
            <> */}

              <Route path="/cs-admin/*" element={<AdminDashboard state={userName} />} />
              {/* <Route path="/admin/" element={<Admin />} /> */}
              <Route path="/company/:id/*" element={<CompanyDashboard />} />
              <Route path="/company/projects/:id/*" element={<Project />} />
              <Route path="/company/employees/:id/*" element={<EmployeeSrc />} />
              <Route path="/company/attendance/:id/*" element={<AttendanceReport />} />
              <Route path="/company/documents/:id/*" element={<Document />} />
              <Route path="/company/contractor/:id/*" element={<SubContract />} />
              <Route path="/temp/*" element={<Csc />} />

            </> 
            {/* : */}
            {/* <Route path="/*" element={<Navigate to="/login" />} /> */}

          {/* } */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App