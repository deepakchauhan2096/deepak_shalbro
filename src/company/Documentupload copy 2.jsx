import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import pdf from "../assests/images/pdf.png";
import jpg from "../assests/images/jpg.png";
import png from "../assests/images/png.png";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ViewListIcon from "@mui/icons-material/ViewList";
import DeleteIcon from "@mui/icons-material/Delete";
import SimpleBackdrop from "../components/Backdrop";
import "../assests/css/document.css"; // Import the CSS file
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DocumentModal from "../components/DocumentModal";
// import env from "react-dotenv";

export default function ProjectUpload(props) {
  const [postImage, setPostImage] = useState({
    myFile: "",
    expiryDate:""
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imagesData, setImagesData] = useState({});
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [fileSelected, setFileSelected] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const DocData = props.empData;
  // console.log("DocData", DocData)
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    getalldocument();
  }, []);

  const headers = {
    "Content-Type": "multipart/form-data",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  // function to download the file 
  const downloadFile = (base64Data, fileName) => {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${base64Data}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Function to upload  the documents 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackdrop(true);
    const response = await axios
      .post("http://18.211.130.168:5001/create_document", postImage.myFile, {
        headers,
      })
      .then((response) => {
        setBackdrop(false);
        getalldocument();
        toast.success("Document uploaded successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        setSelectedFileName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to select the documents to upload 
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileSelected(true);
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("DOCUMENT_REF_ID", DocData.COMPANY_ID);
      formdata.append("DOCUMENT_ADMIN_USERNAME", DocData.COMPANY_PARENT_USERNAME);
      setPostImage({ myFile: formdata });
      setSelectedFileName(file.name);
    } else {
      setFileSelected(false);
    }
  };

  const handleClick = (event) => {
    setPostImage(event);
    // dispatch(initProject_fun(event))
    handleOpen();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to Fetch the uploaded documents 
  const getalldocument = () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("authorization_key", "qzOUsBmZFgMDlwGtrgYypxUz");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        DOCUMENT_REF_ID: DocData.COMPANY_ID,
        DOCUMENT_ADMIN_USERNAME: DocData.COMPANY_PARENT_USERNAME,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://18.211.130.168:5001/get_all_document", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setImagesData(data);
          setTotalDocuments(data.result?.length || 0);
        })
        .catch((error) => {
          console.log("Error Fetching Data :", error);
        });
    } catch (error) {
      console.log("Error Fetching Data :", error);
    }
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  // Function to download the uploaded documents 
  const handleDownload = async (documentId, fileName) => {
    try {
      const data = JSON.stringify({
        DOCUMENT_ID: documentId,
        DOCUMENT_ADMIN_USERNAME: DocData.COMPANY_PARENT_USERNAME,
      });

      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://18.211.130.168:5001/download_document",
        headers: {
          authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      // console.log(response.data);

      downloadFile(response.data, fileName);

    } catch (error) {
      console.log(error);
    }
  };


  // Function to Delete the uploaded documents 
  const handleDelDoc = (e, documentId) => {
    setBackdrop(true);

    let data = JSON.stringify({
      "DOCUMENT_ID": documentId,
      "DOCUMENT_ADMIN_USERNAME": DocData.COMPANY_PARENT_USERNAME
    });

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://18.211.130.168:5001/delete_document/${documentId}`,
      headers: {
        'authorization_key': 'qzOUsBmZFgMDlwGtrgYypxUz',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setBackdrop(false);
        toast.success("Document uploaded successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        getalldocument();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Document not found!', {

          // Show for 2 seconds
        });
      });


  }
  // const handleSubmit = () => {

  //   const FormData = require('form-data');
  //   const fs = require('fs');
  //   let data = new FormData();
  //   data.append('file', fs.createReadStream('/C:/Users/Administrator/Downloads/law.pdf'));
  //   data.append('DOCUMENT_REF_ID', '493');
  //   data.append('DOCUMENT_ADMIN_USERNAME', 'deepak2096');
  //   data.append('fileDOCUMENET_EXP_DATE', '2023-09-06T17:04:44.209+00:00');

  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'http://18.211.130.168:5001/create_document',
  //     headers: {
  //       'authorization_key': 'qzOUsBmZFgMDlwGtrgYypxUz',
  //       ...data.getHeaders()
  //     },
  //     data: data
  //   };

  //   axios.request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });


  // }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'documentName',
      headerName: 'Document Name',
      width: 180,
      editable: false,
    },
    {
      field: 'documentSize',
      headerName: 'Document Size',
      width: 150,
      editable: false,

    },
    {
      field: 'uploadDate',
      headerName: 'Document Upload Date',
      type: 'number',
      width: 180,
      editable: false,

    },

    {
      field: 'documentType',
      headerName: 'Document Type',
      type: 'number',
      width: 150,
      editable: false,

    },
    {
      field: 'ExpiryDate',
      headerName: 'Document Expiry',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      editable: false,

    },
    {
      field: "view",
      headerName: "Detail",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn primary btn btn-success"
            style={{ padding: "2px 2px" }}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          >
            view
          </Button>
        );
      },
    },
    {
      field: "download",
      headerName: "Download",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn primary btn btn-success"
            style={{ padding: "2px 8px" }}
          // onClick={(event) => {
          //   handleClick(cellValues);
          // }}
          >
            Download
          </Button>
        );
      },
    },
  ];

  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];
  const rows = totalDocuments;

  return (
    <>
      <div className="ProjectMain">
        {/* <Box>
          <input
            type="file"
            label="Image"
            name="myFile"
            className="font-monospace"
            accept=".jpeg, .png, .jpg, .pdf"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e)}
          />
          <Button
            variant="outlined"
            className="button rounded-2 lowercase"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Add New document&nbsp;
            <AddIcon fontSize="small" />
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            className="button rounded-2 lowercase"
            onClick={handleSubmit}
            disabled={!fileSelected}
          >
            Upload document&nbsp;
            <ArrowCircleUpIcon fontSize="small" />
          </Button>

          {selectedFileName && (
            <p className="font-monospace pt-2 text-success">
              Selected Document: {selectedFileName}
            </p>
          )}
        </Box> */}
        <DocumentModal  empData={props.empData}/>

        <hr />

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>


        <div className="documents-section">
          <div className="documents-header">
            <h4>Uploaded Documents</h4>
            <div className="total-documents">
              <p>Total Number of Documents: {totalDocuments}</p>
            </div>
          </div>

          <Button
            variant="outlined"
            className="button rounded-2 lowercase "
            onClick={() => setShowAllDocuments((prevShowAll) => !prevShowAll)}
          >
            {showAllDocuments ? "Show Less Documents" : "Show All Documents"}&nbsp;
            <ViewListIcon fontSize="small" />
          </Button>

          <div className="documents-section">
            <ul className="Doc_ul">
              {!showAllDocuments
                ? imagesData.result?.slice(0, 8).map((docs, index) => {
                  const documentId = docs.DOCUMENT_ID;
                  const fileName = docs.DOCUMENT_FILEDATA.originalname;
                  const fileType = fileName.split(".").pop().toLowerCase();
                  const isPDF = fileType === "pdf";
                  const isJPG = fileType === "jpg" || fileType === "jpeg";

                  return (
                    <>
                      <div>

                        <li className="Doc_li" key={index}>
                          <span className="delete-icon">
                            <DeleteIcon
                              onClick={(e) => handleDelDoc(e, docs.DOCUMENT_ID)}
                              role="button"
                              type="submit"
                              key={index}
                            />
                          </span>
                          {/* Display the error message for the not found document */}
                          <span className="Docfile-icon">
                            {" "}
                            {isPDF ? (
                              <img src={pdf} alt="pdf" />
                            ) : isJPG ? (
                              <img src={jpg} alt="jpg" />
                            ) : (
                              <img src={png} alt="png" />
                            )}
                          </span>
                          <span className="Docfile-name font-monospace">
                            {fileName.length > 12
                              ? `${fileName.substring(0, 10)}...`
                              : fileName}
                          </span>
                          <button
                            className="doc_anchor font-monospace"
                            onClick={() =>
                              handleDownload(docs.DOCUMENT_ID, fileName)
                            }
                          >
                            Download
                          </button>
                        </li>
                      </div>
                    </>
                  );
                })
                : imagesData.result?.map((docs, index) => {
                  const documentId = docs.DOCUMENT_ID;
                  // Check if the document ID is in the notFoundDocumentIds state
                  const fileName = docs.DOCUMENT_FILEDATA.originalname;
                  const fileType = fileName.split(".").pop().toLowerCase();
                  const isPDF = fileType === "pdf";
                  const isJPG = fileType === "jpg" || fileType === "jpeg";

                  return (
                    <>
                      <div className="documents">
                        <li className="Doc_li" key={index}>
                          <span
                            className="delete-icon"
                          >
                            <DeleteIcon
                              onClick={(e) => handleDelDoc(e, documentId)}
                              role="button"
                              type="submit"
                            />
                          </span>
                          {/* Display the error message for the not found document */}
                          <span className="Docfile-icon">
                            {" "}
                            {isPDF ? (
                              <img src={pdf} alt="pdf" />
                            ) : isJPG ? (
                              <img src={jpg} alt="jpg" />
                            ) : (
                              <img src={png} alt="png" />
                            )}
                          </span>
                          <span className="Docfile-name font-monospace">
                            {fileName.length > 12
                              ? `${fileName.substring(0, 8)}...`
                              : fileName}
                          </span>
                          <button
                            className="doc_anchor font-monospace"
                            onClick={() =>
                              handleDownload(docs.DOCUMENT_ID, fileName)
                            }
                          >
                            Download
                          </button>
                        </li>
                      </div>

                    </>
                  );
                })}
            </ul>
            <hr />
          </div>
        </div>
        <SimpleBackdrop open={backdrop} />
      </div>
    </>
  );
}
