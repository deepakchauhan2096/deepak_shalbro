import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Index from "./pages/index";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import SubContract from "./pages/SubContract";
import Company from "./pages/Company";
import Employee from "./pages/Employee";
import "./assests/css/graph.css"

function App() {
  return (
    <>
      <div
        className="wrapper"
        style={{ overflowX: "scroll", overflow: "hidden" }}
      >
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" index element={<Index />} />
            <Route path="/subcontract" element={<SubContract />} />
            <Route path="/company" element={<Company />} />
            <Route path="/employee" element={<Employee />} />
            {/* <Route path="/employee" element={<Employee />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
