import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/css/sidebar.css";
import "./assests/css/style.css";
import "./assests/css/graph.css";
import { MyContext } from "./context/Mycontext";
import AdminCreate from "./Admin/AdminCreate";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import EmployeeAttendance from "./employee/EmployeeAttendance";
import EmployeeLogin from "./employee/EmployeeLogin";
import Temp from "./Attendance/Temp";
import Cookies from "js-cookie";
import EmployeeHistory from "./employee/EmployeeHistory";
import EmployeeDetail from "./employee/EmployeeDetail";
import CompanyDashboard from "./company/CompanyDashboard";
import Project from "./company/Project";
import EmployeeSrc from "./employee/EmployeeSrc";
import AttendanceReport from "./Attendance/AttendanceAcknowledge";
import Document from "./Document/Documents";
import axios from "axios";
import Page404 from "./pages/Page404";
import Check from "./components/Check";
import BankAccount from "./checkwriter/BankAccount";
// import Screen1 from "./checkwriter/Screen1";
import BankCreate from "./checkwriter/BankCreate"
import BankSrc from "./checkwriter/BankSrc";
function App() {

  const [data, setData] = useState("")
  const [user, userData] = useState("")
  const [dataEmp, setDataEmp] = useState("")
  const [userEmp, userDataEmp] = useState("")
  const [project, setProject] = useState();

  // get cookie

  useEffect(() => {
    let cookdata;
    const cookieData = Cookies.get("myResponseData");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      cookdata = parsedData
      userData(parsedData)
    } else {
      console.log("Cookie data not found.");
    }

    let isAuthenticated = cookdata?.operation === "successfull";
    setData(isAuthenticated)

  }, [])


  useEffect(() => {
    let cookdataEmp;

    const cookieData = Cookies.get("myResponseEmployee");

    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      cookdataEmp = parsedData
      userDataEmp(parsedData)
    } else {
      console.log("Cookie data not found.");
    }

    console.log(cookdataEmp?.operation, "stored data emp")
    let isAuthenticated = cookdataEmp?.operation === "successfull";
    setDataEmp(isAuthenticated)

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = userEmp?.result.EMPLOYEE_ASSIGN.map((item) => {
          const {
            PROJECT_ID,
            PROJECT_PARENT_ID,
            PROJECT_MEMBER_PARENT_ID,
            PROJECT_MEMBER_PARENT_USERNAME,
            PROJECT_USERNAME,
          } = item;
          const data = {
            PROJECT_ID,
            PROJECT_PARENT_ID,
            PROJECT_MEMBER_PARENT_ID,
            PROJECT_MEMBER_PARENT_USERNAME,
            PROJECT_USERNAME,
          };
          return axios.put(
            "/get_projects_one",
            data,
            {
              headers: {
                "Content-Type": "application/json",
                authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
              },
            }
          );
        });

        const responses = await Promise.all(requests);

        const arry = responses.map((response) => response.data.result[0]);
        console.log(arry, "arryarry")
        setProject(arry);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userEmp]);

  console.log(project, "datawind")

  return (
    <div className="wrapper" style={{ overflowX: "scroll", overflow: "hidden" }}>
      
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/signup/*" element={<AdminCreate />} />
            <Route path="/login/*" element={<AdminLogin />} />
            <Route path="/*" element={<AdminLogin />} />
            <Route path="/employee/login/*" element={<EmployeeLogin />} />
          </>
          {data ?
            <>
              <Route
                path="/"
                element={<Navigate to="/admin" />} // Redirect to admin dashboard
              />
              <Route path="/admin/*" element={<AdminDashboard state={user} />} />
              <Route path="/company/:id/*" element={<CompanyDashboard />} />
              <Route path="/company/projects/:id/*" element={<Project />} />
              <Route path="/company/employees/:id/*" element={<EmployeeSrc />} />
              <Route path="/company/attendance/:id/*" element={<AttendanceReport />} />
              <Route path="/company/documents/:id/*" element={<Document />} />
              <Route path="/company/bankaccount/:id/*" element={<BankSrc/>} />
              {/* <Route path="/company/bankaccount/:id/*" element={<BankAccount/>} /> */}
              <Route path="/company/checks/:id/*" element={<BankAccount />}>
              {/* Submenus for Bank Account */}
             
            </Route>
              {user.ADMIN_COMPANIES?.map((e) => <Route path={`/company/${e.COMPANY_ID}&${e.COMPANY_USERNAME}&${e.COMPANY_PARENT_ID}&${e.COMPANY_PARENT_USERNAME}`} element={<Navigate to="/admin" />} />)}
            </> :
            <Route path="/*" element={<Navigate to="/login" />} />
          }
          {dataEmp ?
            <>
              <Route path="/error/*" element={<Page404 />} />
              <Route path="/employee/*" element={<EmployeeDetail state={userEmp.result} />} />
              <Route path="/employee/attendance/:latt/:lngi/:areas/:loca/:employees/:projects/:projectids/*" element={<EmployeeAttendance state={userEmp} />} />
              <Route path="/employee/history/:*" element={<EmployeeHistory state={userEmp} />} />
            </> :
            project?.map((item, index) => (<Route key={index} path={`/employee/attendance/${item?.LATITUDE}/${item?.LONGITUDE}/${item?.AREA}/${item?.LOCATION_NAME}/${userEmp.result?.EMPLOYEE_NAME}/${item?.PROJECT_NAME}/${item?.PROJECT_ID}`} element={<Navigate to="/employee/login" />} />))
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
