import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">ShallBro</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav ">
             <Link to="/"> <a className="nav-link active text-decoration-none" aria-current="page">
                Home
              </a></Link>
            <Link to="/signup"><a className="nav-link active text-decoration-none" aria-current="page">
                Sign Up
              </a>
              </Link>
             <Link to="/feature"><a className="nav-link text-decoration-none">Features</a></Link>
            
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
