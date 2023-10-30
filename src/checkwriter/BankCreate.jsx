import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import country from "../Api/countryCityState.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import projectList from "../jsonlist/typeOfProject.json";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function BankCreate({
  COMPANY_ID,
  COMPANY_USERNAME,
  COMPANY_PARENT_ID,
  COMPANY_PARENT_USERNAME,
  Update,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [createAccount, setCreateAccount] = useState({
    BANK_COMPANY_ID: "",
    BANK_COMPANY_USERNAME: "",
    BANK_ADMIN_ID: "",
    BANK_ADMIN_USERNAME: "",
    BANK_EMPLOYEE_ID: "",
    BANK_EMPLOYEE_USERNAME: "",

    BANK_NAME: "",
    BANK_ROUTING_NO: "",
    BANK_AC_NO: "",
    BANKEMPLOYEE_NIKE_NAME: "",
    BANK_ACCOUNT_TYPE: "",
    BANK_CHECK_NO: "",
    BANK_FRACTIONAL_NO: "",
    BANK_ADDRESS: "",
    BANK_COUNTRY: "",
    BANK_STATE: "",
    BANK_CITY: "",
    BANK_ZIP: "",
    BANK_SIGN: "",


    BANK_ARC_STATUS: "",
    BANK_VERIFY: "",

  });
  const [checkError, setCheckError] = useState("");
  const [accountError, setAccountError] = useState("");
  const [nameError, setNameError] = useState("");

  // random username

  function generateRandomUsername() {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let username = "";

    // Add the first five characters
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      username += charset[randomIndex];
    }

    // Add six random digits
    for (let i = 0; i < 6; i++) {
      username += Math.floor(Math.random() * 10); // Generates random digits (0-9)
    }

    return username;
  }

  // Usage example: Generate a random username with 5 characters followed by 6 digits
  const randomUsername = generateRandomUsername();

  // random username

  console.log("project", createAccount);

  useEffect(() => {
    setCreateAccount((prevState) => ({
      ...prevState,
      BANK_COMPANY_ID: COMPANY_ID,
    }));
    setCreateAccount((prevState) => ({
      ...prevState,
      BANK_COMPANY_USERNAME: COMPANY_USERNAME,
    }));
    setCreateAccount((prevState) => ({
      ...prevState,
      BANK_ADMIN_ID: COMPANY_PARENT_ID,
    }));
    setCreateAccount((prevState) => ({
      ...prevState,
      BANK_ADMIN_USERNAME: COMPANY_PARENT_USERNAME,
    }));
    // setCreateAccount((prevState) => ({
    //   ...prevState,
    //   PROJECT_USERNAME: randomUsername,
    // }));
  }, [open]);

  // console.log(createAccount, "check");

  const availableState = country?.find(
    (c) => c.name === createAccount.BANK_COUNTRY
  );

  // console.log("all states : ===> ", availableState, "country=>", country);
  const availableCities = availableState?.states?.find(
    (s) => s.name === createAccount.BANK_STATE
  );







  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    const { name, value } = e.target;
    setCreateAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openFileInput = () => {
    document.getElementById('inputfile').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous validation errors
    setNameError("");
    setCheckError("");
    setAccountError("");

    const isValidName = createAccount.BANK_NAME !== "";
    const isValidAcNo = createAccount.BANK_AC_NO !== "";
    const isValidCheckNo = createAccount.BANK_CHECK_NO !== "";

    if (!isValidName) {
      setNameError("Name should not be empty");
      return;
    }

    if (!isValidAcNo) {
      setAccountError("Account Number should not be empty");
      return;
    }

    if (!isValidCheckNo) {
      setCheckError("Check Number should not be empty");
      return;
    }

    // Perform API validation and request
    axios
      .post("/bankDetail", createAccount, {
        headers,
      })
      .then((response) => {
        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg);
          toast.error(response.data.errorMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else if (response.data.operation === "successfull") {
          toast.success("Project Created successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
          Update();
          setOpen(false);
          setCreateAccount({});
        }
      })
      .catch((error) => {
        // console.error(error, "ERR");
        toast.error("An error occurred. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };

  // const timeZones = moment.tz.names(); // Get the array of time zone names

  return (
    <>
      <Button
        size="small"
        variant={"outlined"}
        className={"btn button border-bottom bg-white"}
      >
        Bank Accounts
      </Button>
      <button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="btn rounded-0 border-0  rounded-0 text-light btn-primary btn-sm"
        // variant="contained"
        size="small"
      >
        + Add New Account
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-content">
          <form onSubmit={handleSubmit} className="overflow-auto">
            <h5>Create Bank</h5>
            <div className="row py-2">

              <div className="form-group col-xl-4">
                <label>Company Name</label>
                <input
                  type="text"
                  className={`form-control form-control-2 rounded-0 ${nameError ? "is-invalid" : ""
                    }`}
                  id="inputname"
                  placeholder="Bank Name"
                  value={createAccount.BANK_NAME}

                  name="BANK_NAME"
                  onChange={handleCreate}
                  required
                />
                {nameError && (
                  <div className="invalid-feedback">{nameError}</div>
                )}
              </div>


              <div className="form-group col-xl-4">
                <label> Routing Number</label>
                <input
                  type="number"
                  className="form-control form-control-2 rounded-0"
                  placeholder="Routing Number"
                  value={createAccount.BANK_ROUTING_NO}
                  name="BANK_ROUTING_NO"
                  onChange={handleCreate}

                />
              </div>
              <div className="form-group col-xl-4">
                <label>Account Number</label>
                <input
                  type="number"
                  id="inputPassword4"
                  placeholder="Account Number"
                  name="BANK_AC_NO"
                  value={createAccount.BANK_AC_NO}
                  
                  onChange={handleCreate}
                  required
                  className={`form-control form-control-2 rounded-0 ${accountError ? "is-invalid" : ""
                }`}
                />

                {accountError && (
                  <div className="invalid-feedback">{accountError}</div>
                )}
              </div>
            </div>


            <div className="row py-2">
              <div className="form-group col-xl-3">
                <label>Nick Name</label>
                <input
                  type="text"
                  value={createAccount.BANKEMPLOYEE_NIKE_NAME}
                  name="BANKEMPLOYEE_NIKE_NAME"
                  onChange={handleCreate}
               />
              </div>


              <div className="form-group col-md-3">
                <label>Select Account Type</label>
                <select
                  id="inputEnroll"
                  className="form-control form-control-2 border rounded-0"
                  name="BANK_ACCOUNT_TYPE"
                  onChange={handleCreate}
                  value={createAccount.BANK_ACCOUNT_TYPE}
                >
                  <option value="">--Select Currency--</option>
                  <option value="Personal Checking">Personal Checking</option>
                  <option value="Business Checking">Business Checking</option>
                  <option value="Personal Savings">Personal Savings</option>
                  <option value="Business Savings">Business Savings</option>
                </select>
               

              </div>
              <div className="form-group col-xl-3">
                <label>Check Number</label>
                <input
                  id="inputEnroll"
                  onChange={handleCreate}
                  name="BANK_CHECK_NO"
                  value={createAccount.BANK_CHECK_NO}
                  className={`form-control form-control-2 rounded-0 ${checkError ? "is-invalid" : ""
                }`}
            />
            {checkError && (
              <div className="invalid-feedback">{checkError}</div>
            )}

              </div>
              <div className="form-group col-md-3">
                <label>Fractional Number </label>
                <input
                  type="text"
                  className="form-control form-control-2 rounded-0 "
                  id="inputsupervisor"
                  name="BANK_FRACTIONAL_NO"
                  value={createAccount.BANK_FRACTIONAL_NO}
                  onChange={handleCreate}
                />
              </div>
            </div>

            <div className="row py-2">

              <div className="form-group  col-md-12">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control rounded-0"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  name="BANK_ADDRESS"
                  value={createAccount.BANK_ADDRESS}
                  onChange={handleCreate}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label>Country</label>
                <select
                  className="form-control form-control-2 border rounded-0"
                  placeholder="Country"
                  name="BANK_COUNTRY"
                  value={createAccount.BANK_COUNTRY}
                  onChange={handleCreate}
                >
                  <option value="">--Choose Country--</option>
                  {country?.map((value, key) => {
                    return (
                      <option value={value.name} key={key}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group col-xl-4">
                <label>State</label>
                <select
                  className="form-control form-control-2 border rounded-0"
                  placeholder="State"
                  name="BANK_STATE"
                  value={createAccount.BANK_STATE}
                  onChange={handleCreate}
                >
                  <option value="">--Choose State--</option>
                  {availableState?.states?.map((e, key) => {
                    return (
                      <option value={e.name} key={key}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group col-xl-4">
                <label>City</label>
                <select
                  className="form-control form-control-2 border rounded-0"
                  placeholder="City"
                  name="BANK_CITY"
                  value={createAccount.BANK_CITY}
                  onChange={handleCreate}
                >
                  <option value="">--Choose City--</option>
                  {availableCities?.cities?.map((e, key) => {
                    return (
                      <option value={e.name} key={key}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="row py-2">


              <div className="form-group col-md-6 ">
                <label>Zip </label>
                <input
                  type="number"
                  className="form-control form-control-2 rounded-0"
                  id="inputsupervisor"
                  name="BANK_ZIP"
                  value={createAccount.BANK_ZIP}
                  onChange={handleCreate}
                />
              </div>

              <div className="form-group col-md-6">
                <br></br>

                <div className="file-upload">
                  <button className="file-upload-button btn btn-primary btn-sm fs-8" onClick={openFileInput}>
                    + Upload Signature
                  </button>
                  <input
                    type="file"
                    id="inputfile"
                    name="BANK_SIGN"
                    value={createAccount.BANK_SIGN}
                    onChange={handleCreate}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>

            <div className="py-2">
              <button
                type="submit"
                className="btn btn-info text-white btn-sm"
                onClick={handleSubmit}
              >
                Create Account
              </button>{" "}
              <button
                onClick={handleClose}
                className="btn btn-danger text-white btn-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
