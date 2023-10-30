import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import env from "react-dotenv";

const Index = () => {
  return (
    <>
        <Navbar />
        <Dashboard />
    </>
  );
};

export default Index;
