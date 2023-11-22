import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Button, Container, Hidden } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Paper, styled } from "@mui/material";
import country from "../Api/countriess.json"
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import env from "react-dotenv";

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

export default function CompanyDelete(props) {
  const [open, setOpen] = React.useState(false);
  const [edit_company, setedit_company] = useState({
    COMPANY_PARENT_ID: props.ID,
    COMPANY_PARENT_USERNAME: props.Username,
    COMPANY_NAME: "",
    COMPANY_USERNAME: "",
    COMPANY_PHONE: "",
    COMPANY_EMAIL: "",
    COMPANY_ADD2: "",
    COMPANY_STATE: "",
    COMPANY_CITY: "",
    COMPANY_COUNTRY: "",
  });

  const handleCreate = (e) => {
    setedit_company({ ...edit_company, [e.target.name]: e.target.value });
  };

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // Finding the states and cities of the individaul country 
  const availableState = country?.find((c) => c.name === edit_company.PROJECT_COUNTRY);

  console.log("all states : ===> ", availableState)
  const availableCities = availableState?.states?.find(
    (s) => s.name === edit_company.PROJECT_STATE
  );

  console.log("states data : ========>",availableState);

  const handleSubmit = (e) => {
    console.log("on btn submit");
    e.preventDefault();
    axios
      .post("/api/update_company", edit_company, {
        headers,
      })
      .then((response) => {
        props.Update(()=> response.data.result);
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
    <>
       <DeleteSweepOutlinedIcon 
       color="error"
       onClick={handleOpen}
       style={{cursor:"pointer"}}
       
       />
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container
          id="content"
          style={{ height: "100vh", position: "relative" }}
          maxWidth="xl"
        >
          <Box sx={style}>
            <form className="p-4">
              <div className="row">
                <div className="form-group py-2 col-xl-6">
                  <label>Company name</label>
                  <input
                    type="text"
                    className="form-control form-control-2 rounded-0"
                    placeholder="Enter company name"
                    value={edit_company.COMPANY_NAME}
                    name="COMPANY_NAME"
                    onChange={handleCreate}
                    label=""
                  />
                </div>
                <div className="form-group py-2 col-xl-6">
                  <label>Company username</label>
                  <input
                    type="text"
                    className="form-control form-control-2 rounded-0"
                    placeholder="Username"
                    value={edit_company.COMPANY_USERNAME}
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
                  className="form-control form-control-2 rounded-0"
                  placeholder="Enter Number"
                  value={edit_company.COMPANY_PHONE}
                  name="COMPANY_PHONE"
                  onChange={handleCreate}
                  label="Phone Number"
                />
                </div>
                <div className="form-group py-2 col-xl-6">
                  <label>Company Email</label>
                <input
                  type="text"
                  className="form-control form-control-2 rounded-0"
                  placeholder="Enter company email"
                  name="COMPANY_EMAIL"
                  value={edit_company.COMPANY_EMAIL}
                  onChange={handleCreate}
                  label="Company Email"
                />
                </div>
              </div>
              <div className="row py-2">
              <div className="form-group col-xl-4">
                  <label>Country</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_STATE"
                    value={edit_company.COMPANY_COUNTRY}
                    onChange={handleCreate}
                  >
                    <option selected>Choose...</option>
                   
                   {country.map((e,key)=>{
                    return(
                          <option value={e.name} key={key}>{e.name}</option>
                    )
                   })} 
                    
                  </select>
                </div>

                <div className="form-group col-xl-4">
                  <label>State</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_STATE"
                    value={edit_company.COMPANY_STATE}
                    onChange={handleCreate}
                  >
                    <option selected >Choose... States</option>
                  {availableState?.states?.map((state,key) => {
                    return(
                      <option value={state.name} key={key} >{state.name}</option>
                    )
                  })} 
                    
                  </select>
                </div>

                <div className="form-group col-xl-4">
                  <label>City</label>
                  <select
                    className="form-control form-control-2 border rounded-0"
                    name="COMPANY_CITY"
                    value={edit_company.COMPANY_CITY}
                    onChange={handleCreate}
                  >
                    <option selected>Choose City...</option>
                  {availableCities?.cities?.map((e,key)=> {
                    return(
                      <option value={e.name} key={key}>{e.name}</option>
                    )
                  })} 
                     
                  </select>
                </div>
               

              
              </div>
              <div className="form-group col-xl-12">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control form-control-2 rounded-0"
                  placeholder="Apartment, studio, or floor"
                  name="COMPANY_ADD2"
                  value={edit_company.COMPANY_ADD2}
                  onChange={handleCreate}
                  // rows="4"
                  // cols="50"
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="btn text-white rounded-2 mt-2"
                onClick={handleSubmit}
              >
                Submit
              </Button>{" "}
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                className="btn text-white rounded-2 mt-2"
              >
                Discard
              </Button>
            </form>
          </Box>
        </Container>
      </Modal>
    </>
  );
}