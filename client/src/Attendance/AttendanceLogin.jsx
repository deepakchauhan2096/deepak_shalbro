import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputControl from "../components/InputControl";
import styles from "../assests/css/Login.module.css";
import SimpleBackdrop from "../components/Backdrop"; // Replace "./SimpleBackdrop" with the correct path to the file containing the MUI backdrop component

function AdminLogin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ADMIN_USERNAME: "",
    ADMIN_PASSWORD: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

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

      data: values,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data, "mylogin");
        setIsSubmitting(false);
        setLoginSuccess(true);
        const data = response.data;
        if (data.operation === "successfull") {
          navigate("/admin", { state: { data } });
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>
          Login<sup style={{ fontSize: "20px", color: "tomato" }}>Admin</sup>
        </h1>

        <InputControl
          label="Username"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_USERNAME: event.target.value,
            }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_PASSWORD: event.target.value,
            }))
          }
          placeholder="Enter Password"
        />

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
