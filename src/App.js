import "../src/assests/css/sidebar.css";
import "../src/assests/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assests/css/graph.css";
import CreateEmp from "./Employee/EmployeeCreate";
import { auth } from "./firebase";
import AdminCreate from "./Admin/AdminCreate";
import AdminDashboard from "./Admin/AdminDashboard";
import CompanyMain from "./company/CompanyMain";
import AdminLogin from "./Admin/AdminLogin";
import { MyContext } from "./company/Mycontext";

function App() {
  // const [emailname, setEmailName] = useState(false);
  const [data, setData] = useState({
    emailName: "",
    usernames: "",
  });

  const [text, setText] = useState("")
  const [alldata, setallData] = useState("")
const [projectcreatedata, setProject] = useState([])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {

      console.log(user, "user");
      if (user) {
        setData((prev) => {
          return {
            ...prev,
            emailName: user.email,
            usernames: user.displayName,
          };
        });
        // setUserName(user.);

      } else setData("");
    });
  }, []);

  return (
    <>
      <div
        className="wrapper"
        style={{ overflowX: "scroll", overflow: "hidden" }}
      >
        <MyContext.Provider value={{ text, setText, data, setData, projectcreatedata, setProject }}>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<AdminCreate />} />
              <Route
                path="/admin"
                element={
                  <AdminDashboard
                    email={data.emailName}
                    user={data.usernames}
                  />
                }
              />
              <Route path="/company" element={<CompanyMain />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/createemp" element={<CreateEmp />} />
            </Routes>
          </BrowserRouter>
        </MyContext.Provider>
      </div>
    </>
  );
}

export default App;
