import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputControl from "../components/InputControl";
import styles from "../assests/css/Signup.module.css";
import SimpleBackdrop from "../components/Backdrop"; // Replace "../components/Backdrop" with the correct path to the file containing the MUI backdrop component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminCreate() {
  const [values, setValues] = useState({
    ADMIN_PASSWORD: "",
    ADMIN_NAME: "",
    ADMIN_PHONE: "",
    ADMIN_EMAIL: "",
    ADMIN_USERNAME: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loader, setLoader] = useState(false); // Initialize to false

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !values.ADMIN_NAME ||
      !values.ADMIN_EMAIL ||
      !values.ADMIN_PASSWORD ||
      !values.ADMIN_PHONE ||
      !values.ADMIN_USERNAME
    ) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setLoader(true);

    // Show the backdrop when the signup button is clicked

    axios
      .post("/api/create_admin", values)
      .then((response) => {
        setErrorMsg(response.errorMsg);

        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg);
          setLoader(false); // Hide the backdrop on signup failure
        } else if (response.data.operation === "successfull") {
          toast.success("Congratulations.. You Ragistered successfully!!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1200,
          });
          navigate("/login");
          setLoader(false); // Hide the backdrop on successful signup
        }
      })
      .catch((error) => {
        setErrorMsg("User Already Exists");
        setLoader(false); // Hide the backdrop on signup failure
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>
          Signup<sup style={{ fontSize: "20px", color: "tomato" }}>Admin</sup>
        </h1>

        <InputControl
          label="User Name"
          placeholder="Enter your username"
          className="form-control form-control-2"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_USERNAME: event.target.value,
            }))
          }
        />
        <InputControl
          label="Name"
          className="form-control form-control-2"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_NAME: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          className="form-control form-control-2"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_EMAIL: event.target.value }))
          }
        />
        <InputControl
          label="Phone"
          className="form-control form-control-2"
          placeholder="Enter phone"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ADMIN_PHONE: event.target.value }))
          }
        />
        <InputControl
          type="password"
          label="Password"
          placeholder="Enter password"
          className="form-control form-control-2"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_PASSWORD: event.target.value,
            }))
          }
        />

        <div className={styles.footer}>
          <center>
            <p className=" text-danger fw-light mb-0">{errorMsg}</p>
          </center>
          <button onClick={handleSubmit} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
      </div>

      {/* Add the backdrop component here */}
      <SimpleBackdrop open={loader} />
    </div>
  );
}

export default AdminCreate;
