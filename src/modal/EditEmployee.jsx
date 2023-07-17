import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

export default function EditEmployee(props) {
  const [createEmployee, setCreateEmployee] = useState({
    EMPLOYEE_ID: "",
    EMPLOYEE_NAME: "",
    EMPLOYEE_EMAIL: "",
    EMPLOYEE_STATE: "",
    EMPLOYEE_CITY: "",
    EMPLOYEE_PHONE: "",
    EMPLOYEE_HOURLY_WAGE: "",
    EMPLOYEE_ROLE: "",
    EMPLOYEE_EMPLMNTTYPE: "",
    EMPLOYEE_DOB: "",
    EMPLOYEE_HIRE_DATE: "",
    EMPLOYEE_ADD: "",
    EMPLOYEE_USERNAME: "",
    EMPLOYEE_MEMBER_PARENT_USERNAME: "deepanshu1",
    EMPLOYEE_PARENT_ID: 45,
    EMPLOYEE_PARENT_USERNAME: "company21",
    EMPLOYEE_MEMBER_PARENT_ID: 18,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    setCreateEmployee({ ...createEmployee, [e.target.name]: e.target.value });
    console.log("heello world", createEmployee);
  };

  const handleSubmit = (e) => {
    console.log("on btn submit");
    e.preventDefault();
    axios
      .post("http://3.84.137.243:5001/create_employee", createEmployee, {
        headers,
      })
      .then((response) => {
        console.log("response1 : ", response);
        props.update(response.data);
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
        Edit
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
            <div className="form-group py-2 col-md-4">
              <label for="file" >Education Doc</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div>

            <div className="form-group py-2 col-md-4">
              <label for="file" >Valid ID</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div>

            <div className="form-group py-2 col-md-4">
              <label for="file" >Other</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div>

            </div>

            <div className="form-group py-2">
              <div className="form-check">
                <input
                  className="form-check-input rounded-0"
                  type="checkbox"
                  id="gridCheck"
                />
                <label className="form-check-label" for="gridCheck">
                  Check me out
                </label>
              </div>
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
        </Container>
      </Modal>
    </>
  );
}
