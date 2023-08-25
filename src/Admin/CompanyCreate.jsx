import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Button, Container, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import country from "../Api/countriess.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleBackdrop from "../components/Backdrop";
import { faListSquares } from "@fortawesome/free-solid-svg-icons";
import { Fab, Paper, } from "@mui/material";
import companytype from "../jsonlist/typeOfCompany.json"

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
  const [loader, setLoader] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [create_company, setCreate_company] = useState({
    COMPANY_PARENT_ID: props.ID,
    COMPANY_PARENT_USERNAME: props.Username,
    COMPANY_NAME: "",
    COMPANY_USERNAME: "",
    COMPANY_PHONE: "",
    COMPANY_EMAIL: "",
    COMPANY_ROLE:"",
    COMPANY_ADD2: "",
    COMPANY_STATE: "",
    COMPANY_CITY: "",
    COMPANY_COUNTRY: "",
  });

  const handleCreate = (e) => {
    setCreate_company({ ...create_company, [e.target.name]: e.target.value });
  };

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };
 

  // Finding the states and cities of the individaul country 

  const availableState = country?.find(
    (c) => c.name === create_company.COMPANY_COUNTRY
  );


  const availableCities = availableState?.states?.find(

    (s) => {

      return s.name === create_company.COMPANY_STATE
    }
  );

const list = companytype;
console.log("hbbbdf", list)


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     !create_company.COMPANY_USERNAME ||
  //     !create_company.COMPANY_NAME ||
  //     !create_company.COMPANY_PHONE ||
  //     !create_company.COMPANY_ADD2 ||
  //     !create_company.COMPANY_EMAIL ||
  //     !create_company.COMPANY_COUNTRY ||
  //     !create_company.COMPANY_CITY ||
  //     !create_company.COMPANY_STATE ||
  //     !create_company.COMPANY_PARENT_ID||
  //     !create_company.COMPANY_PARENT_USERNAME
  //   ) {
  //     setErrorMsg("Fill all fields");
  //     return;
  //   }
  //   setErrorMsg("");

  
  //   axios
  //   .post(`http://18.211.130.168:5001/create_company`, create_company, {
  //     headers,
  //   })
  //   .then((response) => {
      
  //     if (response.data.operation === "failed") {
  //       setErrorMsg(response.data.errorMsg);
  //     } else if (response.data.operation === "successfull") {
  //       toast.success("Company Created successfully!", {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 1000,
  //       });
  //       props.Update(() => response.data.result);
  //       setCreate_company("");
  //       setOpen(false);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error, "ERR");

  //   });
  // };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (
      !create_company.COMPANY_USERNAME ||
      !create_company.COMPANY_NAME ||
      !create_company.COMPANY_PHONE ||
      !create_company.COMPANY_ADD2 ||
      !create_company.COMPANY_EMAIL ||
      !create_company.COMPANY_COUNTRY ||
      !create_company.COMPANY_CITY ||
      !create_company.COMPANY_STATE ||
      !create_company.COMPANY_PARENT_ID ||
      !create_company.COMPANY_PARENT_USERNAME
    ) {
      setErrorMsg("Fill all fields");
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    setErrorMsg("");
  
    axios
      .post(`http://18.211.130.168:5001/create_company`, create_company, {
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
          toast.success("Company Created successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
          props.Update(() => response.data.result);
          setCreate_company({
            // Reset your state after successful submission
            COMPANY_PARENT_ID: props.ID,
            COMPANY_PARENT_USERNAME: props.Username,
            COMPANY_NAME: "",
            COMPANY_USERNAME: "",
            COMPANY_PHONE: "",
            COMPANY_EMAIL: "",
            COMPANY_ROLE: "",
            COMPANY_ADD2: "",
            COMPANY_STATE: "",
            COMPANY_CITY: "",
            COMPANY_COUNTRY: "",
          });
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error(error, "ERR");
        toast.error("An error occurred. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };
  const StyledFab = styled(Fab)({

    position: "fixed",
    top: "80px",
    right: "80px",


  });
  return (
    <>
      <StyledFab onClick={handleOpen} size="medium" color="secondary" aria-label="add" style={props.btnstyle}>
        <AddIcon />
      </StyledFab>

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
                    className="form-control form-control-2 rounded-0"
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
                    className="form-control form-control-2 rounded-0"
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
                    className="form-control form-control-2 rounded-0"
                    placeholder="Enter company email"
                    name="COMPANY_EMAIL"
                    value={create_company.COMPANY_EMAIL}
                    onChange={handleCreate}
                    label="Company Email"
                  />
                </div>
              </div>

              <div className="row py-2">
              <div className="form-group col-xl-4">
                  <label>Company Type</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_ROLE"
                    value={create_company.COMPANY_ROLE}
                    onChange={handleCreate}
                  >
                    <option selected>Choose...</option>

                    {list.map((e, key) => {
                      return (
                        <option value={e} key={key}>{e}</option>
                      )
                    })}

                  </select>
                </div>

                <div className="form-group col-xl-4">
                  <label>Country</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_COUNTRY"
                    value={create_company.COMPANY_COUNTRY}
                    onChange={handleCreate}
                  >
                    <option selected>Choose...</option>

                    {country.map((e, key) => {
                      return (
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
                    value={create_company.COMPANY_STATE}
                    onChange={handleCreate}
                  >

                    <option>--Choose State--</option>
                    {availableState?.states?.map((e, key) => {
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
               <div className="form-group col-xl-4">
                  <label>City</label>
                  <select
                    className="form-control form-control-2 border rounded-0"
                    name="COMPANY_CITY"
                    value={create_company.COMPANY_CITY}
                    onChange={handleCreate}
                  >
                    <option selected>Choose City...</option>
                    {availableCities?.cities?.map((e, key) => {
                      return (
                        <option value={e.name} key={key}>{e.name}</option>
                      )
                    })}

                  </select>
                </div>
              <div className="form-group col-xl-8">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control form-control-2 rounded-0"
                  placeholder="Apartment, studio, or floor"
                  name="COMPANY_ADD2"
                  value={create_company.COMPANY_ADD2}
                  onChange={handleCreate}
                // rows="4"
                // cols="50"
                />
              </div>
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
              {/* <center>
              {errorMsg && (
                <p className=" text-danger fw-light mb-0 fs-6">{errorMsg}</p>
              )}
            </center> */}
            </form>
           
          </Box>
        </Container>
      </Modal>

      <SimpleBackdrop open={loader} />
    </>
  );
}
