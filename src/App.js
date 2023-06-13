import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Index from "./pages/index"
import Feature from "./pages/Feature"
import Navbar from "./components/Navbar"
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={ <Navbar />}/>
         <Route path="/signup" element={ <Signup />}/>
         <Route index element={ <Index />}/>
         <Route path="/feature" element={ <Feature />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
