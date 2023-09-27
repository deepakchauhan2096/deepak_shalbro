import React,{useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

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

const FileInput = styled("input")({
  display: "none",
});

const FileInputLabel = styled("label")({
  display: "block",
  width: "100%",
  padding: "10px 15px",
  background: "#277099",
  color: "#fff",
  textAlign: "center",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background 0.3s, color 0.3s",
  "&:hover": {
    background: "#1a5c83",
  },
});

const  VehicleCreate = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [createVehicle, setCreateVehicle] = useState({
  
    make: '',
    model: '',
    modelNumber: '',
    vehicleName: '',
    vehicleNumber: '',
    year: '',
    licenseFile: null,
    pollutionDocument: null,
 
});


  useEffect(() => {
    // Update createVehicle state using props or other relevant data
  }, [open]);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setCreateVehicle((prevState) => ({
      ...prevState,
      [fileType]: file,
    }));
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
     
      "make",
      "model",

      "modelNumber",
      "vehicleName",
      "vehicleNumber",
      "licenseFile",
      "year",
      "pollutionFile",
      "pollutionDocument"
      

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
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label> Project Username</label>

                <TextField
                  label="Vehicle Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={createVehicle.vehicleName}
                  name="vehicleName"
                  onChange={handleCreate}
                  required
                />
              </div>
              <div className="form-group col-xl-6">
              <label> Project Username</label>

                <TextField
                  label="Vehicle Number"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={createVehicle.vehicleNumber}
                  name="vehicleNumber"
                  onChange={handleCreate}
                  required
                />
              </div>
            </div>

            <div className="row py-2">

              <div className="form-group col-xl-6">

                <FileInputLabel>
                  Upload License Document
                  <FileInput
                    type="file"
                    onChange={(e) => handleFileChange(e, "licenseFile")}
                    required
                  />
                </FileInputLabel>
              </div>
              <div className="form-group col-xl-6">

                <FileInputLabel>
                  Upload Pollution Document
                  <FileInput
                    type="file"
                    onChange={(e) => handleFileChange(e, "pollutionFile")}
                    required
                  />
                </FileInputLabel>
              </div>
            </div>


            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
            >
              Submit
            </Button>{" "}
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Discard
            </Button>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};
 export default VehicleCreate;
