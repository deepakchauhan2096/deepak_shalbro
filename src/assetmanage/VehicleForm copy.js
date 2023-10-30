import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import country from "../countriess.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function VehicleCreate(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [createVehicle, setCreateVehicle] = useState({
    vehicleName: "",
    vehicleNumber: "",
    licenseFile: null,
    pollutionFile: null,
  });

  useEffect(() => {
    // Update createVehicle state using props or other relevant data
  }, [open]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCreateVehicle((prevState) => ({ ...prevState, pollutionFile: file }));
  };

  const handleCreate = (e) => {
    const { name, value } = e.target;
    setCreateVehicle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "vehicleName",
      "vehicleNumber",
      "licenseFile",
      "pollutionFile",
    ];

    const hasEmptyFields = requiredFields.some(
      (field) => !createVehicle[field]
    );

    if (hasEmptyFields) {
      setErrorMsg("Fill all fields");
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    setErrorMsg("");

    // Handle Axios POST request
    // ...

    // Close the modal and reset the form
    handleClose();
  };

  return (
    <>
    
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="btn rounded-0 border-0  rounded-0 text-light"
        variant="contained"
        size="small"
      >
        + Add New Vehicle
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            {/* Replicate the input fields here */}
            {/* For example: */}
            <input
              type="text"
              placeholder="Vehicle Name"
              value={createVehicle.vehicleName}
              name="vehicleName"
              onChange={handleCreate}
              required
            />
            <input
              type="text"
              placeholder="Vehicle Number"
              value={createVehicle.vehicleNumber}
              name="vehicleNumber"
              onChange={handleCreate}
              required
            />
            <label>Upload License Document:</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
            />
            <label>Upload Pollution Document:</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
            />
            {/* Rest of the form */}
            {/* ... */}
            <button
              type="submit"
              className="btn btn-info text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>{" "}
            <button
              onClick={handleClose}
              className="btn btn-danger text-white"
            >
              Discard
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
