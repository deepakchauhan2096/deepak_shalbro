import React, { useState } from "react";
import { Link , useLocation} from "react-router-dom";

const Navbar = () => {
  const [index, setIndex] = useState(1)
  const location = useLocation();
  console.log(location.pathname, "loc")


  return (
    <>
      <nav id="sidebar" style={{height:"100vh"}}>
            <div className="sidebar-header">
                <h3>Shalbro</h3>
            </div>

            <ul className="list-unstyled components">
                <li style={{background: location.pathname === "/dashboard" ? "#3596d9" : ""}} >
                    <Link to="/dashboard" >Dashboard</Link>
                </li>
                {/* <li style={{background: location.pathname === "/Company" ? "#3596d9" : ""}} >
                    <Link to="/Company" ></Link>
                </li> */}
                <li style={{background: location.pathname === "/Contract" ? "#3596d9" : ""}}>
                    <Link to="/Contract">Sub Contractors</Link>
                </li>
            </ul>
      </nav>
    </>
  );
};

export default Navbar;
