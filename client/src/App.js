import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import Signup from "./auth/Signup";
import Login from "./components/Login";
import Admin from "./components/Admin";
import { auth } from "./firebase";
import SubContract from "./subcontract/SubContract";
import AdminLogin from "./auth/AdminLogin";
import axios from "axios";
import Logincomp from "./components/Logincomp";
import Firecreate from "./components/Firecreate";
import UserLogin from "./auth/UserLogin";
import Updates from "./auth/Update";

function App() {


  const [userName, setUserName] = useState("");


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const data = user?.displayName
        const splitedData = data.split("&&")
        console.log(user, "user")
        setUserName(splitedData);
        console.log(splitedData, "splitedData")
      } else setUserName("");
    });
  }, []);










  return (
    <div className="wrapper" style={{ overflowX: "scroll", overflow: "hidden" }}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/root" element={<AdminLogin />} />
            <Route path="/" element={<UserLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/error" element={<Page404 />} />
            <Route path="/employee/history/" element={<EmployeeHistory />} />
            <Route path="/myadmin/*" element={<AdminDashboard />} />
            <Route path="/test" element={<Updates />} />


            

            {/* <Route path="/company" element={"company" === userName[4] ? <CompanyDashboard data={userName} /> : <Navigate to="/" />} /> */}
            {/* <Route path="/employee" element={"employee" === userName[4] ? <EmployeeDetail state={userName} /> : <Navigate to="/" />} /> */}


            <Route path="/company/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME" element={"company" === userName[4] ? <CompanyDashboard data={userName} />  : <Navigate to="/" />}  />
            <Route path="/employee/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME" element={"employee" === userName[4] ? <EmployeeDetail state={userName} />  : <Navigate to="/" />}  />
            <Route path="/employee/attendance" element={<EmployeeAttendance state={userName} />} />
            <Route path="/employee/attendance/:latt/:lngi/:areas/:loca/:employees/:projects/:projectids" element={<EmployeeAttendance state={userName} />} />


            {/* {
              ("company" === userName[4]  || "employee" === userName[4] ) && (
                <>
                  <Route
                    path={`/${userName[4]}`}
                    element={
                      userName[4] === "company" ? (
                        <CompanyDashboard data={userName} />
                      ) : (
                        <EmployeeDetail state={userName} />
                      )
                    }
                  />
                  <Route
                    path={`/${userName[4]}/attendance`}
                    element={<EmployeeAttendance state={userName} />}
                  />
                  <Route
                    path={`/${userName[4]}/attendance/:latt/:lngi/:areas/:loca/:employees/:projects/:projectids`}
                    element={<EmployeeAttendance state={userName} />}
                  />
                </>
              )
            } */}


            <Route path="/company/projects/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME" element={<Project />} />
            <Route path="/company/employees/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME" element={<EmployeeSrc />} />
            <Route path="/company/attendance/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME" element={<AttendanceReport />} />
            <Route path="/company/documents/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME" element={<Document />} />
            <Route path="/company/contractor/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME" element={<SubContract />} />
            <Route path="/temp/" element={<Firecreate />} />

          </>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App