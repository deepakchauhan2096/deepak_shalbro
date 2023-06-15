import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Index from "./pages/index";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Contract from "./pages/Contract";
import Company from "./pages/Company";

function App() {
  return (
    <>
      <div
        className="wrapper"
        style={{ overflowX: "scroll", overflow: "hidden" }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" index element={<Index />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/company" element={<Company />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
