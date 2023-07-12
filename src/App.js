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
import LoginEmp from "./Employee/Auth/Login"
import { auth } from "./firebase";
import Page404 from "./pages/PageNotFound";
import Loader from "./pages/Loader";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Attendances from "./pages/Attendances";
import Screen from "./components/Screen";
import AdminCreate from "./Admin/AdminCreate";
import AdminDashboard from "./Admin/AdminDashboard";
import CompanyDashboard from "./company/CompanyDashboard";

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
      console.log(user,"user")
      if (user) {
        setData(prev=>{
          return {...prev,
          emailName : user.email, 
          usernames : user.displayName
        }
      });
        // setUserName(user.);
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
              <Route path="/login" element={<Login/>} />
              {/* <Route path="/dashboard" element={userName ? <Index /> : <Login/>} /> */}
              {/* <Route path="/signup" element={userName ? <Index /> : <Signup/>} />
              <Route path="/employee/login" element={<LoginEmp/>} />
              <Route path="/login" element={emailname ? <Index /> : <Login/>} />
              <Route path="/subcontract" element={ userName ? <SubContract /> : ""} />
              <Route path="/company" element={ userName ? <Company /> : ""} />
              <Route path="/employee" element={userName ? <Employee /> : ""} />
              <Route path="/project" element={ userName ? <Project /> : ""} />
              <Route path="/attendance" element={ userName ? <Attendances /> : ""} />
              <Route path="*" element={ userName ? <Page404 link="/dashboard" /> : <Page404 link="/" />} /> */}
            </Routes>
          </BrowserRouter>
      </div>
    </>
  );
}

export default App;
