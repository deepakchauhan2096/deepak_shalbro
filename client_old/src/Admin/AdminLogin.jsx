import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import InputControl from "../components/InputControl";
import styles from "../assests/css/Login.module.css";
import SimpleBackdrop from "../components/Backdrop";
import { useContext } from "react";
import { MyContext } from "../context/Mycontext";
import Cookies from "js-cookie";

function AdminLogin({ onDataFetched }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ADMIN_USERNAME: "",
    ADMIN_PASSWORD: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showpassword, setShowpassword] = useState(true)
  const { auth, setAuth } = useContext(MyContext);

  const handleSubmission = () => {

    if (!values.ADMIN_USERNAME || !values.ADMIN_PASSWORD) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/login",
      headers: {
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
        "Content-Type": "application/json",
      },
      data: values,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data, "mylogin");
        setIsSubmitting(false);
        setLoginSuccess(true);
        const data = response.data;
        console.log(data);
        navigate("/admin")
      })
      .catch((error) => {
        setErrorMsg(error.response.data.error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h5 className={styles.heading}>Shalbro Constructions</h5>
        <h5 className="text-center">Login(root)</h5>

        <InputControl
          label="Username"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_USERNAME: event.target.value,
            }))
          }
          placeholder="Enter Username"
        />
        <span style={{position:"relative"}}>
          <InputControl
            label="Password"
            type={showpassword ? "password" : "text"}
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                ADMIN_PASSWORD: event.target.value,
              }))
            }
            placeholder="Enter Password"
            
          />
            <span style={{position:"absolute", right:"10px", top:"50%"}}><i class="fa fa-eye" onClick={() => setShowpassword(e => !e)}></i></span>
        </span>

        <div className={styles.footer}>
          <center>
            <p className="text-danger fw-light mb-0">{errorMsg}</p>
            {loginSuccess && (
              <p className="text-success fw-light mb-0">Login successful!</p>
            )}
          </center>
          <button disabled={isSubmitting} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>

      {/* Add the MUI backdrop component here */}
      <SimpleBackdrop open={isSubmitting} />
    </div>
  );
}

export default AdminLogin;