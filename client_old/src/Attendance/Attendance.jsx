import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Button, Container, Hidden } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Paper, styled } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: 2,
  overflow: "hidden",
};

export default function CompanyCreate(props) {
  const [open, setOpen] = React.useState(false);

  const [create_company, setCreate_company] = useState({
    COMPANY_PARENT_ID: props.ID,
    COMPANY_PARENT_USERNAME: props.Username,
    COMPANY_NAME: "",
    COMPANY_USERNAME: "",
    COMPANY_PHONE: "",
    COMPANY_EMAIL: "",
    COMPANY_ADD2: "",
    COMPANY_STATE: "",
    COMPANY_CITY: "",
  });

  const handleCreate = (e) => {
    setCreate_company({ ...create_company, [e.target.name]: e.target.value });
  };

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  console.log(create_company, props.ID, "jungli");

  const handleSubmit = (e) => {
    console.log("on btn submit");
    e.preventDefault();
    axios
      .post("/api/create_company", create_company, {
        headers,
      })
      .then((response) => {
        props.Update(()=> response.data.result);
        console.log("fuck")
        if(response){
          handleClose();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  const StyledFab = styled(Fab)({

    position: "fixed",
    top: "80px",
    right: "80px",


  });

 

  

  return (
    // <div style={{ outline: "none" }}>
    <>
      <StyledFab onClick={handleOpen} color="secondary" aria-label="add">
        <AddIcon />
      </StyledFab>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              className="bg-primary p-1 px-4 text-white"
            >
              <Box>Create company</Box>
              <Box>x</Box>
            </Box>
            <form className="p-4">
              <div className="row">
                <div className="form-group py-2 col-xl-6">
                  <label>Company name</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Enter company name"
                    value={create_company.COMPANY_NAME}
                    name="COMPANY_NAME"
                    onChange={handleCreate}
                    label=""
                  />
                </div>
                <div className="form-group py-2 col-xl-6">
                  <label>Company username</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Username"
                    value={create_company.COMPANY_USERNAME}
                    name="COMPANY_USERNAME"
                    onChange={handleCreate}
                    label="Company username"
                  />
                </div>
              </div>

              <div className="row">
              <div className="form-group py-2 col-xl-6">
                  <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  placeholder="Enter Number"
                  value={create_company.COMPANY_PHONE}
                  name="COMPANY_PHONE"
                  onChange={handleCreate}
                  label="Phone Number"
                />
                </div>
                <div className="form-group py-2 col-xl-6">
                  <label>Company Email</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  placeholder="Enter company email"
                  name="COMPANY_EMAIL"
                  value={create_company.COMPANY_EMAIL}
                  onChange={handleCreate}
                  label="Company Email"
                />
                </div>
              </div>
              <div className="row py-2">
                <div className="form-group col-xl-6">
                  <label>City</label>
                  <select
                    className="form-control rounded-0"
                    name="COMPANY_CITY"
                    value={create_company.COMPANY_CITY}
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
                <div className="form-group col-xl-6">
                  <label>State</label>
                  <select
                    className="form-control rounded-0"
                    name="COMPANY_STATE"
                    value={create_company.COMPANY_STATE}
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
              <div className="form-group col-xl-12">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control rounded-0"
                  placeholder="Apartment, studio, or floor"
                  name="COMPANY_ADD2"
                  value={create_company.COMPANY_ADD2}
                  onChange={handleCreate}
                  rows="4"
                  cols="50"
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="btn text-white rounded-0 mt-2"
                onClick={handleSubmit}
              >
                Submit
              </Button>{" "}
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                className="btn text-white rounded-0 mt-2"
              >
                Discard
              </Button>
            </form>
          </Box>
      </Modal>
    </>
    // </div>
  );
}