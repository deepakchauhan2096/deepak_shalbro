import React from "react";
import Signup from "../components/Signup";
import Navbar from "../components/Navbar";

const SignupPage = () => {
  return (
    <>
      <div className="signupPage" style={{height:"100vh"}}>
        <h1>Hello world</h1>
      <Navbar />
      <Signup />
      </div>
    </>
  );
};

export default SignupPage;
