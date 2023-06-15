import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import pluslogo from "../assests/images/plus.png"

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

export default function AddCompany() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <div className="form-group col-xl-6">
                <label for="inputEmail4">Company Name</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputEmail4"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-xl-6">
                <label for="inputPassword4">Phone Number</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Number"
                />
              </div>
            </div>
            <div className="form-group py-2">
              <label for="inputAddress">Address</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="form-group py-2">
              <label for="inputAddress2">Address 2</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div className="row py-2">
              <div className="form-group col-md-6">
                <label for="inputCity">City</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputCity"
                />
              </div>
              <div className="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" className="form-control rounded-0">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputZip"
                />
              </div>
            </div>
            <div className="row py-2">
            <div className="form-group py-2 col-md-4">
              <label for="file" >Compliance doc</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div>

            <div className="form-group py-2 col-md-4">
              <label for="file" >Policies</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div>

            <div className="form-group py-2 col-md-4">
              <label for="file" >Auto policies</label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="file"
                />
            </div>

            <div className="form-group py-2 col-md-4">
              <label for="file" >Law suits</label>
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
            



            <button type="submit" className="btn btn-info text-white rounded-0">
              Submit
            </button>
            {" "}
            <button onClick={handleClose} className="btn btn-danger text-white rounded-0">
              Disgard
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
