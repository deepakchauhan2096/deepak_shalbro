import React, { useState } from "react";
import AddCompany from "../modal/AddCompany";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import fileDownload from "js-file-download";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "COMPANY_NAME",
    headerName: "company Name",
    width: 150,
    // editable: true,
  },
  {
    field: "COMPANY_USERNAME",
    headerName: "company Name",
    width: 150,
    // editable: true,
  },
  {
    field: "COMPANY_PHONE",
    headerName: "Phone",
    width: 150,
    // editable: true,
  },
  {
    field: "COMPANY_EMAIL",
    headerName: "State",
    width: 110,
    // editable: true,
  },
  {
    field: "COMPANY_ADD2",
    headerName: "City",
    width: 100,
    // editable: true,
  },
  {
    field: "COMPANY_STATE",
    headerName: "zip",
    type: "number",
    width: 100,
    // editable: true,
  },

  {
    field: "COMPANY_ROLE",
    headerName: "Address",
    width: 270,
    // editable: true,
  },

  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (cellValues) => {
      return (
        // <button
        //   variant="contained"
        //   className="primary btn btn-success rounded-0"
        //   style={{ padding: "2px 2px" }}
        //   onClick={(event) => {
        //     handleClick(cellValues);
        //   }}
        // >
        //   Show Detail
        // </button>
        <>
          <Detail id={cellValues} />
        </>
      );
    },
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

function downloadPDF(pdf) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = "abc.pdf";
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

const CompanySrc = (props) => {
  const [compdata, setCompdata] = useState([]);

  const getCompanyData = (data) => {
    console.log("all company data", data);
    const realdata = data.result;
    setCompdata(realdata);
  };


  return (
    <div id="content" style={{ height: "100vh" }}>
      <AddCompany sendDataToParent={getCompanyData} />
{/* <pre> {JSON.stringify(compdata.id)}</pre> */}
      <Box sx={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={compdata}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          density="compact"
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
        />
      </Box>
    </div>
  );
};

export default CompanySrc;

function Detail(props) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   const data = rows.filter((item) => item.id.includes(props.id));
  console.log(props, "props value");
  const propsValue = props.id.row;
  const keysValue = Object.keys(propsValue);
  console.log(keysValue, "props value 2");

  return (
    <>
      <button
        onClick={handleOpen}
        className="btn btn-success text-white rounded-0"
        style={{ padding: "2px 2px" }}
      >
        ShowDetail
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button
            className="btn btn-info rounded-0 border-white"
            style={{ background: index === 1 ? "#fff" : "" }}
            onClick={(e) => setIndex(1)}
          >
            Detail
          </button>

          <button
            className="btn btn-info rounded-0 border-white"
            style={{ background: index === 2 ? "#fff" : "" }}
            onClick={(e) => setIndex(2)}
          >
            Document
          </button>

          <button
            className="btn btn-info rounded-0 border-white"
            style={{ background: index === 3 ? "#fff" : "" }}
            onClick={(e) => setIndex(3)}
          >
            Contract Detail
          </button>

          {index === 1 ? (
            <div className="p-4">
              <h5 style={{ textDecoration: "underline" }}>Company Detail</h5>
              <p>Company Name : {propsValue.companyName}</p>
              <p>Phone Number : {propsValue.PhoneNumber}</p>
              <p>State : {propsValue.state}</p>
              <p>City : {propsValue.city}</p>
              <p>Address : {propsValue.address}</p>
            </div>
          ) : (
            ""
          )}
          {index === 2 ? (
            <div className="p-4">
              <h5 style={{ textDecoration: "underline" }}>All Documents</h5>
              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Compliance Doc
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(propsValue.complianceDoc)}
                >
                  Download file
                </button>
              </div>

              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Policies
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(propsValue.complianceDoc)}
                >
                  Download file
                </button>
              </div>
              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Auto Policies
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(propsValue.complianceDoc)}
                >
                  Download file
                </button>
              </div>

              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Law Suits
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(propsValue.complianceDoc)}
                >
                  Download file
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          {index === 3 ? (
            <div className="p-4">
              <h5 style={{ textDecoration: "underline" }}>
                Company's contract
              </h5>
            </div>
          ) : (
            ""
          )}

          <button
            onClick={handleClose}
            className="btn btn-danger text-white rounded-0 position-absolute top-0 right-0"
            style={{ right: "0" }}
          >
            x
          </button>
        </Box>
      </Modal>
    </>
  );
}
