import "../src/assests/css/sidebar.css";
import "../src/assests/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Index from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import SubContract from "./pages/SubContract";
import Company from "./pages/Company";
import Employee from "./pages/Employee";
import "./assests/css/graph.css";
import Project from "./pages/Project";
import Login from "./pages/Login";
import LoginEmp from "./Employee/Login"
import CreateEmp from "./Employee/EmployeeCreate"
import { auth } from "./firebase";
import Page404 from "./pages/PageNotFound";
import Loader from "./pages/Loader";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Attendances from "./pages/Attendances";
import Screen from "./components/Screen";
import AdminCreate from "./Admin/AdminCreate";
import AdminDashboard from "./Admin/AdminDashboard";
import CompanyDashboard from "./company/CompanyDashboard";
import AdminLogin from "./Admin/AdminLogin";

function App() {
  // const [emailname, setEmailName] = useState(false);
  const [data, setData] = useState(
    {
      emailName:"",
      usernames:""
    }
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setData(prev=>{
          return {...prev,
          emailName : user.email, 
          usernames : user.displayName
        }
      });
      } else setData("");
    });
  }, []);

  return (
    <>
      <div
        className="wrapper"
        style={{ overflowX: "scroll", overflow: "hidden" }}
      >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AdminCreate />} />
              <Route path="/admin" element={<AdminDashboard email={data.emailName}  user={data.usernames}  />} />
              <Route path="/company" element={<CompanyDashboard />} />
              <Route path="/login" element={<AdminLogin/>} />
              <Route path="/employee" element={<LoginEmp/>} />
              <Route path="/createemp" element={<CreateEmp/>} />
            </Routes>
          </BrowserRouter>
      </div>
    </>
  );
}

export default App;
