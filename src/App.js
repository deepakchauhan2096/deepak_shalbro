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
import Attendances from "./pages/Attendances";
import Screen from "./components/Screen";

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
              <Route path="/" element={!userName ? <Login/> : <Index />} />
              <Route path="/signup" index element={userName ? <Index /> : <Signup/>} />
              <Route path="/login" index element={userName ? <Index /> : <Login/>} />
              <Route path="/dashboard" index element={userName ? <Index /> : <Login/>} />
              <Route path="/subcontract" element={ userName ? <SubContract /> : ""} />
              <Route path="/company" element={ userName ? <Company /> : ""} />
              <Route path="/employee" element={userName ? <Employee /> : ""} />
              <Route path="/contract" element={ userName ? <Contract /> : ""} />
              <Route path="/attendance" element={ userName ? <Attendances /> : ""} />
              {/* <Route path="/attendance" element={ userName ? <Screen /> : ""} /> */}
              <Route path="*" element={ userName ? <Page404 link="/dashboard" /> : <Page404 link="/" />} />
            </Routes>
          </BrowserRouter>
      </div>
    </>
  );
}

export default App;
