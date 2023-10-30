import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from 'axios';
import { Button, Container } from "@mui/material";

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

export default function AddCompany(props) {
  
  const [open, setOpen] = React.useState(false);
 

  const [create_company, setCreate_company] = useState({
    COMPANY_PARENT_ID: 18,
    COMPANY_PARENT_USERNAME:"deepanshu1",
    COMPANY_NAME: "",
    COMPANY_USERNAME: "",
    COMPANY_PHONE: "",
    COMPANY_EMAIL: "",
    COMPANY_ROLE: "Admin",
    COMPANY_ADD2: "",
    COMPANY_STATE: "",
  });

  // console.log("All state Data",create_company)

  const headers = {
    'Content-Type': 'application/json',
    'authorization_key': 'qzOUsBmZFgMDlwGtrgYypxUz'
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const handleCreate = (e) => {
    setCreate_company({...create_company,[e.target.name]:e.target.value})
    // console.log("heello world",create_company)
  }




  const handleSubmit = (e) => {
    console.log("on btn submit")
    e.preventDefault();
    axios.post("http://3.84.137.243:5001/create_company", create_company, { headers })
      .then((response) => {
        console.log("response1 : ",response)
        props.update(response.data);
        console.log("response",response.data)
      })
      .catch((error) => {
        console.error(error);
      });
      handleClose();
  };

  return (
    // <div style={{ outline: "none" }}>
    <>
       <Button className="btn button btn-blue" variant="contained">
              {props.name ? props.name : "Enter Name"}
      </Button>

      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className="rounded-0 border-0"
        variant="outlined"
      >
        + Add {props.name}
      </Button>

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
          <form>
            <div className="row py-2">
              <div className="form-group py-2 col-xl-6">
                <label >Company Name</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputcompName"
                  placeholder="Company Name"
                  value={create_company.COMPANY_NAME}
                  name="COMPANY_NAME"
                  onChange={handleCreate}
                />
              </div>
              <div className="form-group py-2 col-xl-6">
                <label >Company username</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputUsername"
                  placeholder="Username"
                  value={create_company.COMPANY_USERNAME}
                  name="COMPANY_USERNAME"
                  onChange={handleCreate}

                />
              </div>
            </div>

            <div className="row py-2">
              <div className="form-group py-2 col-xl-6">
                <label >Company Admin</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputEmail4"
                  placeholder="Email"
                  value={create_company.COMPANY_PARENT_ID}
                  name="COMPANY_PARENT_ID"
                  // defaultValue="Admin"
                  // onChange={handleCreate}
                />
              </div>
              <div className="form-group py-2 col-xl-6">
                <label >Company parent username</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputusername"
                  placeholder=" Parent Username"
                  value={create_company.COMPANY_PARENT_USERNAME}
                  name="COMPANY_PARENT_USERNAME"
                  // onChange={handleCreate}

                />
              </div>
            </div>

            <div className="row">
              <div className="form-group py-2 col-xl-6">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  id="inputphone"
                  placeholder="Enter Number"
                  value={create_company.COMPANY_PHONE}
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
                  // value={create_company.add}
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
                value={create_company.COMPANY_ADD2}
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
                  value={create_company.COMPANY_EMAIL}
                  onChange={handleCreate}

                />
              </div>
              <div className="form-group col-md-6">
                <label>State</label>
                <select
                  id="inputState"
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
          
           
            <Button type="submit" variant="contained" className="btn text-white rounded-0 mt-2" onClick={handleSubmit}>
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
        </Container>
      </Modal>
      </>
    // </div>

  );
}



