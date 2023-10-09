import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import InputControl from "./InputControl";
import axios from "axios";
import { auth } from "../firebase";

import styles from "../assests/css/Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ROOT_USERNAME: "",
    ROOT_PASSWORD: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(true)

  const handleSubmission = () => {

    if (!values.ROOT_USERNAME || !values.ROOT_PASSWORD) {
      setErrorMsg("Fill all fields");
      return;
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/login",
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
        const data = response.data;
        console.log(data,"data")
        if (data.operation === "successful") {
          window.alert("login successful")
          // Cookies.set("myResponseData", JSON.stringify(data), { expires: 7 }); // Cookie will expire in 7 days
          navigate("/cs-admin", {state : data});
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.error);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h5 className={styles.heading}>Shalbro Constructions</h5>
        <h5 className="text-center">Login(ROOT)</h5>

        <InputControl
          label="Username"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ROOT_USERNAME: event.target.value }))
          }
          placeholder="Enter Username"
        />

        <span style={{ position: "relative" }}>
          <InputControl
            label="Password"
            type={showpassword ? "password" : "text"}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, ROOT_PASSWORD: event.target.value }))
            }
            placeholder="Enter Password"
          />
          <span style={{ position: "absolute", right: "10px", top: "50%" }}>
            <i className={showpassword ? "fa fa-eye-slash" : "fa fa-eye"} onClick={() => setShowpassword(e => !e)}></i></span>

        </span>

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            {loading ? "loading..." : "Login"}
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
