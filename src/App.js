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
import Contract from "./pages/Contract";
import Login from "./pages/Login";
import { auth } from "./firebase";
import Page404 from "./pages/PageNotFound";
import Loader from "./pages/Loader";
import { faL } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [userName, setUserName] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.email);
      } else setUserName("");
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
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" index element={<Index />} />
              <Route path="/subcontract" element={<SubContract />} />
              <Route path="/company" element={<Company />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/contract" element={<Contract />} />
              <Route path="*" element={<Page404 link="/dashboard" />} />
            </Routes>
          </BrowserRouter>
      </div>
    </>
  );
}

export default App;
