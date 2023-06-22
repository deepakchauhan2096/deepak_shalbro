import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import pluslogo from "../assests/images/plus.png"
import axios from 'axios';

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

export default function AddCompany({sendDataToParent}) {
  
  const [open, setOpen] = React.useState(false);
  const [create_data, setCreate_data] = useState({
    COMPANY_NAME: "",
    COMPANY_USERNAME: "",
    COMPANY_PHONE: "",
    COMPANY_EMAIL: "",
    COMPANY_ROLE: "Admin",
    COMPANY_ADD2: "",
    COMPANY_STATE: "",
  });

  const headers = {
    'Content-Type': 'application/json',
    'authorization_key': 'qzOUsBmZFgMDlwGtrgYypxUz'
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const handleCreate = (e) => {
      setCreate_data({...create_data,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://54.89.160.62:5001/create_user", create_data, { headers })
      .then((response) => {
        console.log("response : ",response.data.result)
        sendDataToParent(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ outline: "none" }}>
      <button
        onClick={handleOpen}
        className="btn btn-info text-white rounded-0"
      >
        + Add Company
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <div className="row py-2">
              <div className="form-group py-2 col-xl-6">
                <label for="inputEmail4">Company Name</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputEmail4"
                  placeholder="Email"
                  value={create_data.COMPANY_NAME}
                  name="COMPANY_NAME"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group py-2 col-xl-6">
                <label for="inputAddress">Company username</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputAddress"
                  placeholder="Username"
                  value={create_data.COMPANY_USERNAME}
                  name="COMPANY_USERNAME"
                  onChange={handleCreate}

                />
              </div>
            </div>
            <div className="row">
              <div className="form-group py-2 col-xl-6">
                <label for="inputPassword4">Phone Number</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Number"
                  value={create_data.COMPANY_PHONE}
                  name="COMPANY_PHONE"
                  onChange={handleCreate}

                />
              </div>
              <div className="form-group py-2 col-xl-6">
                <label>Role</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  defaultValue="Admin"
                  name="COMPANY_ROLE"
                  // value={create_data.add}
                  // onChange={handleCreate}

                />
              </div>
            </div>
            <div className="form-group py-2">
              <label >Address 2</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                name="COMPANY_ADD2"
                value={create_data.COMPANY_ADD2}
                onChange={handleCreate}

              />
            </div>
            <div className="row py-2">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputCity"
                  name="COMPANY_EMAIL"
                  value={create_data.COMPANY_EMAIL}
                  onChange={handleCreate}

                />
              </div>
              <div className="form-group col-md-6">
                <label>State</label>
                <select
                  id="inputState"
                  className="form-control rounded-0"
                  name="COMPANY_STATE"
                  value={create_data.COMPANY_STATE}
                  onChange={handleCreate}

                >
                  <option selected>Choose...</option>
                  <option>Haryana</option>
                  <option>Uttar pradesh</option>
                  <option>Himachal pradesh</option>
                  <option>Madhya pradesh</option>
                  <option>Bihar</option>
                  <option>Jharkhand</option>
                  <option>Jharkhand</option>
                </select>
              </div>
            
            </div>
          
           
            <button type="submit" className="btn btn-info text-white rounded-0 mt-2" onClick={handleSubmit}>
              Submit
            </button>{" "}
            <button
              onClick={handleClose}
              className="btn btn-danger text-white rounded-0 mt-2"
            >
              Discard
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
