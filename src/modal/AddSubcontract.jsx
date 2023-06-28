import React, {useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import pluslogo from "../assests/images/plus.png";
import { Button } from "@mui/material";
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

export default function AddSubContract() {
  const[ createSubContractor, setCreateSubContractor] = useState({
    SUBCONTRACTOR_ID:"",
    SUBCONTRACTOR_NAME: "",
    SUBCONTRACTOR_USERNAME: "",
    SUBCONTRACTOR_EMAIL: "",
    SUBCONTRACTOR_PHONE: "",
    SUBCONTRACTOR_QUALIFICATION: "",
    SUBCONTRACTOR_ENROLLMENT: "",
    SUBCONTRACTOR_ADD: "",
    SUBCONTRACTOR_CITY: "",
    SUBCONTRACTOR_STATE: "",
    SUBCONTRACTOR_COMP_DOC: "",
    SUBCONTRACTOR_AUTO_POLICY: "",
    SUBCONTRACTOR_LAW: "",
    SUBCONTRACTOR_MEMBER_PARENT_USERNAME: "deepanshu1",
    SUBCONTRACTOR_PARENT_ID: 45,
    SUBCONTRACTOR_PARENT_USERNAME: "company21",
    SUBCONTRACTOR_MEMBER_PARENT_ID: 18,
  })


   const handleCreate = (e) => {
      setCreateSubContractor({...createSubContractor,[e.target.name]:e.target.value})
      console.log("subContractor : => ", createSubContractor)
  }
  const headers = {
    authorization_key:"qzOUsBmZFgMDlwGtrgYypxUz",
    "Content-Type": "application/json",
  }
  const handleSubmit = (e) => {
   e.preventDefault();
   axios.post("http://54.89.160.62:5001/create_subcontractor",{},{headers})
   .then((response)=>{
    console.log("subcontract Form Data: =>", response)
   })
   .catch((err)=>{
    console.log("something Went wrong:=>",err)
   })
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = React.useState(1);

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="rounded-0 border-0"
        variant="outlined"
      >
        + Add New Sub Contrator
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
                <label >Name</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="name"
                  placeholder=" Enter Your Name"
                  value={createSubContractor.SUBCONTRACTOR_NAME}
                  name="SUBCONTRACTOR_NAME"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group col-xl-4">
                <label for="inputPassword4">Username</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="SUBCONTRACTOR_USERNAME"
                  placeholder="Enter USERNAME"
                  value={createSubContractor.SUBCONTRACTOR_USERNAME}
                  name="SUBCONTRACTOR_USERNAME"
                  onChange={handleCreate}
                />
              </div>

              <div className="form-group col-xl-4">
                <label for="inputPassword4">E-mail</label>
                <input
                  type="email"
                  className="form-control rounded-0"
                  id="email"
                  placeholder="Enter email"
                  value={createSubContractor.SUBCONTRACTOR_EMAIL}
                  name="SUBCONTRACTOR_EMAIL"
                  onChange={handleCreate}
                />
              </div>
            </div>
            <div className="row py-2">
            <div className="form-group col-xl-4">
                <label for="inputPassword4">Phone Number</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Number"
                  value={createSubContractor.SUBCONTRACTOR_PHONE}
                  name="SUBCONTRACTOR_PHONE"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group col-xl-4">
                <label for="inputqual">Qualification</label>
                <select id="inputqual" className="form-control rounded-0"
                 value={createSubContractor.SUBCONTRACTOR_QUALIFICATION}
                 name="SUBCONTRACTOR_QUALIFICATION"
                 onChange={handleCreate}
                >
                  <option selected>Choose...</option>
                  <option>B.E</option>
                  <option>Diploma</option>
                  <option>12th</option>
                  <option>10th</option>
                  <option>other</option>
                </select>
              </div>

              <div className="form-group col-xl-4">
                <label for="inputEnroll">Enrollment</label>
                <select id="inputEnroll" className="form-control rounded-0"
                 value={createSubContractor.SUBCONTRACTOR_ENROLLMENT}
                 name="SUBCONTRACTOR_ENROLLMENT"
                 onChange={handleCreate}
                >
                  <option selected>Choose...</option>
                  <option>painter</option>
                  <option>fitter</option>
                  <option>plumber</option>
                  <option>engineer</option>
                </select>
              </div>

          
            </div>
            <div className="form-group py-2">
              <label for="inputAddress2">Address</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                value={createSubContractor.SUBCONTRACTOR_ADD}
                name="SUBCONTRACTOR_ADD"
                onChange={handleCreate}
              />
            </div>
            <div className="row py-2">
              <div className="form-group col-md-6">
                <label for="inputCity">City</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputCity"
                  value={createSubContractor.SUBCONTRACTOR_CITY}
                  name="SUBCONTRACTOR_CITY"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputState">State</label>
                <select id="inputState" className="form-control rounded-0"
                 value={createSubContractor.SUBCONTRACTOR_STATE}
                 name="SUBCONTRACTOR_STATE"
                 onChange={handleCreate}
                >
                  <option selected>Choose...</option>
                  <option>Haryana</option>
                  <option>Uttarpradesh</option>
                  <option>Delhi</option>
                  <option>Himachal</option>
                  <option>Uttrakhand</option>
                </select>
              </div>
            
            </div>
            <div className="row py-2">
              <div className="form-group py-2 col-md-4">
                <label for="file">Compliance doc</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                  value={createSubContractor.SUBCONTRACTOR_COMP_DOC}
                  name="SUBCONTRACTOR_COMP_DOC"
                  onChange={handleCreate}
                />
              </div>

            
              <div className="form-group py-2 col-md-4">
                <label for="file">Auto policies</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                  value={createSubContractor.SUBCONTRACTOR_AUTO_POLICY}
                  name="SUBCONTRACTOR_AUTO_POLICY"
                  onChange={handleCreate}
                />
              </div>
              
             <div className="form-group py-2 col-md-4">
               <label >Law suits</label>
                 <input
                   className="form-control rounded-0"
                   type="file"
                   id="file"
                   value={createSubContractor.SUBCONTRACTOR_LAW}
                   name="SUBCONTRACTOR_LAW"
                   onChange={handleCreate}
                 />
             </div>
            </div>
            <div className="row py-2">
               
                <div className="form-group col-xl-6">
                  <label for="inputPassword4">
                    SUBCONTRACTOR_MEMBER_PARENT_USERNAME
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter hire date"
                    value={createSubContractor.SUBCONTRACTOR_MEMBER_PARENT_USERNAME}
                    name="EMPLOYEE_MEMBER_PARENT_USERNAME"
                    onChange={handleCreate}
                  />
                </div>
                <div className="form-group col-xl-6">
                  <label for="inputPassword4">SUBCONTRACTOR_MEMBER_PARENT_ID</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter hire date"
                    value={createSubContractor.SUBCONTRACTOR_MEMBER_PARENT_ID}
                    name="EMPLOYEE_MEMBER_PARENT_USERNAME_ID"
                    onChange={handleCreate}
                  />
                </div>
              </div>
            <div className="row py-2">
                <div className="form-group col-xl-6">
                  <label for="inputqual">SUBCONTRACTOR_PARENT_ID</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputZip"
                    value={createSubContractor.SUBCONTRACTOR_PARENT_ID}
                    name="EMPLOYEE_PARENT_ID"
                    onChange={handleCreate}
                  />
                </div>
                <div className="form-group col-xl-6">
                  <label for="inputPassword4">SUBCONTRACTOR_PARENT_USERNAME</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter hire date"
                    value={createSubContractor.SUBCONTRACTOR_PARENT_USERNAME}
                    name="EMPLOYEE_PARENT_USERNAME"
                    onChange={handleCreate}
                  />
                </div>
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
