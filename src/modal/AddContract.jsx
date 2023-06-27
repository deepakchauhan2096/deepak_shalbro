import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import pluslogo from "../assests/images/plus.png";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddContract() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = React.useState(1);

  const [createContract, setCreateContract] = useState({
    CONTRACT_PARENT_ID: 45,
    CONTRACT_PARENT_USERNAME: "company21",
    CONTRACT_MEMBER_PARENT_ID: 18,
    CONTRACT_MEMBER_PARENT_USERNAME: "deepanshu1",
    CONTRACT_NAME: "",
    CONTRACT_USERNAME: "",
    CONTRACT_PHONE: "",
    CONTRACT_ADD: "",
    CONTRACT_CITY: "",
    CONTRACT_START_DATE: "",
    CONTRACT_END_DATE: "",
    CONTRACT_SUPERVISOR: "",
    CONTRACT_EMROLMNT_TYPE: "",
  });

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    setCreateContract({ ...createContract, [e.target.name]: e.target.value });
    console.log("heello world", createContract);
  };

  const handleSubmit = (e) => {
    console.log("on btn submit");
    e.preventDefault();
    axios
      .post("http://54.89.160.62:5001/create_contract", createContract, {
        headers,
      })
      .then((response) => {
        console.log("response1 : ", response);
        // sendDataToParent(response.data);
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="rounded-0 border-0"
        variant="outlined"
      >
        + Add New Contrator
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label> Contract Username</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputusername"
                  placeholder="Username"
                  value={createContract.CONTRACT_USERNAME}
                  name="CONTRACT_USERNAME"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Contract Name</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputname"
                  placeholder="Contract Name"
                  value={createContract.CONTRACT_NAME}
                  name="CONTRACT_NAME"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group col-xl-4">
                <label>Contact</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Phone Number"
                  name="CONTRACT_PHONE"
                  value={createContract.CONTRACT_PHONE}
                  onChange={handleCreate}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label className="py-2 border" >Contract start date</label>
                <input
                  type="date"
                  value={createContract.CONTRACT_START_DATE}
                  name="CONTRACT_START_DATE"
                  onChange={handleCreate}
                  className="mx-2 py-2 border"
                />
              </div>
              <div className="form-group col-xl-6">
                <label className="py-2 border">Contract End date</label>
                <input
                  type="date"
                  value={createContract.CONTRACT_END_DATE}
                  name="CONTRACT_END_DATE"
                  onChange={handleCreate}
                  className="mx-2 py-2 border"
                />
              </div>
            </div>

            <div className="row py-2">
            
                <div className="form-group col-xl-6">
                  <label>Enrollment</label>
                  <select
                    id="inputEnroll"
                    className="form-control rounded-0"
                    onChange={handleCreate}
                    name="CONTRACT_EMROLMNT_TYPE"
                    value={createContract.CONTRACT_EMROLMNT_TYPE}
                  >
                    <option selected>Choose...</option>
                    <option>painter</option>
                    <option>fitter</option>
                    <option>plumber</option>
                    <option>engineer</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                <label>Supervisor</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputsupervisor"
                  name="CONTRACT_SUPERVISOR"
                  value={createContract.CONTRACT_SUPERVISOR}
                  onChange={handleCreate}
                />
            
              </div>
            </div>
            <div className="form-group py-2">
              <label>Address</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                name="CONTRACT_ADD"
                value={createContract.CONTRACT_ADD}
                onChange={handleCreate}
              />
            </div>
            <div className="row py-2">
              <div className="form-group col-md-6">
                <label>City</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputCity"
                  name="CONTRACT_CITY"
                  value={createContract.CONTRACT_CITY}
                  onChange={handleCreate}
                />
              </div>
            </div>
            <div className="row py-2">
              {/* <div className="form-group py-2 col-md-4">
              <label for="file" >Compliance doc</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div> */}

              {/* <div className="form-group py-2 col-md-4">
              <label for="file" >Policies</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div> */}

              {/* <div className="form-group py-2 col-md-4">
              <label for="file" >Auto policies</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div> */}
              {/* 
            <div className="form-group py-2 col-md-4">
              <label for="file" >Law suits</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div> */}
            </div>
            <button type="submit" className="btn btn-info text-white rounded-0" onClick={handleSubmit}>
              Submit
            </button>{" "}
            <button
              onClick={handleClose}
              className="btn btn-danger text-white rounded-0"
            >
              Discard
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
