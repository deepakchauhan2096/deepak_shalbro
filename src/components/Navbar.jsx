import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
const Navbar = () => {
  const [index, setIndex] = useState(1);
  const location = useLocation();
  console.log(location.pathname, "loc");

  return (
    <>
      <nav id="sidebar" style={{ height: "100vh", position:"relative" }}>
        <div className="sidebar-header">
          <h3>Shalbro</h3>
        </div>

        <ul className="list-unstyled components">
          <li
            style={{
              background: location.pathname === "/dashboard" ? "#3596d9" : "",
            }}
          >
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li
            style={{
              background: location.pathname === "/company" ? "#3596d9" : "",
            }}
          >
            <Link to="/company">Company</Link>
          </li>

          <li
            style={{
              background: location.pathname === "/contract" ? "#3596d9" : "",
            }}
          >
            <Link to="/contract">Contract</Link>
          </li>

          <li
            style={{
              background: location.pathname === "/subcontract" ? "#3596d9" : "",
            }}
          >
            <Link to="/subcontract">Sub Contractors</Link>
          </li>

          <li
            style={{
              background: location.pathname === "/employee" ? "#3596d9" : "",
            }}
          >
            <Link to="/employee">Employee</Link>
          </li>
        </ul>

        <div className="login sidebar_footer position-absolute" style={{bottom:"0"}}>
          <div className="logout_icon">
            <LogoutIcon />
          </div>
          <div className="logout_icon">Logout</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
