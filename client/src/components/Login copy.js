import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "./InputControl";
import { auth } from "../firebase";

import styles from "../assests/css/Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(true)

  const handleSubmission = () => {

    if (!values.email || !values.pass) {
      setErrorMsg("Please fill all fields");
      return;
    }
    setErrorMsg("");
    setLoading(true)
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        setLoading(false)
        navigate("/admin");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        setLoading(false)
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h5 className={styles.heading}>Shalbro Constructions</h5>
        <h5 className="text-center">Login(Admin)</h5>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />

        <span style={{ position: "relative" }}>
          <InputControl
            label="Password"
            type={showpassword ? "password" : "text"}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
          />
          <span style={{ position: "absolute", right: "10px", top: "50%" }}>
            <i className={showpassword ? "fa fa-eye-slash" : "fa fa-eye" } onClick={() => setShowpassword(e => !e)}></i></span>
            
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
