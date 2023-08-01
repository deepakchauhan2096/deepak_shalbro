import "../src/assests/css/sidebar.css";
import "../src/assests/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assests/css/graph.css";
import AdminCreate from "./Admin/AdminCreate";
import AdminDashboard from "./Admin/AdminDashboard";
import CompanyMain from "./company/CompanyMain";
import AdminLogin from "./Admin/AdminLogin";
import { MyContext } from "./context/Mycontext";
import { ToastContainer } from "react-toastify";
import EmployeeAttendance from "./employee/EmployeeAttendance";
import EmployeeLogin from "./employee/EmployeeLogin";

function App() {
  // const [emailname, setEmailName] = useState(false);
  const [text, setText] = useState("")
  const [projectcreatedata, setProject] = useState([])


  return (
    <>
      <div
        className="wrapper"
        style={{ overflowX: "scroll", overflow: "hidden" }}
      >
        <ToastContainer />
        <MyContext.Provider value={{ text, setText, projectcreatedata, setProject }}>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<AdminCreate />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/company" element={<CompanyMain />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/" element={<AdminLogin />} />
              <Route path="/employee" element={<EmployeeAttendance />} />
              <Route path="/employee/login" element={<EmployeeLogin />} />
            </Routes> 
          </BrowserRouter>
        </MyContext.Provider>
      </div>
    </>
  );
}

export default App;
