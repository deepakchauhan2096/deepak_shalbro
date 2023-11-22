import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import "../assests/css/document.css";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import pdf from "../assests/images/pdf.png";
import jpg from "../assests/images/jpg.png";
import png from "../assests/images/png.png";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ViewListIcon from "@mui/icons-material/ViewList"; 

export default function ProjectUpload(props) {
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const [imagesData, setImagesData] = useState({});
  const [show, setShow] = useState(false);
    // New state to manage visibility of the documents list
    const [showDocuments, setShowDocuments] = useState(false);
  console.log("Images data is here:=>", imagesData.result);
  // this is data of company for fetch the company username
  const DocData = props.empData;
  console.table(DocData, "<<=====================company data");


  useEffect(() => {
    getalldocument();
  }, []);

  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  // };

  // Download file
  const downloadFile = (base64Data, fileName) => {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${base64Data}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //create document
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios
      .post("/api/create_document", postImage.myFile)
      .then((response) => {
        console.log("response data  anurag pal:", response.data);
        getalldocument();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //upload document throught input
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("DOCUMENT_REF_ID", DocData.COMPANY_PARENT_ID);
    formdata.append("DOCUMENT_ADMIN_USERNAME", DocData.COMPANY_PARENT_USERNAME);
    // formdata.append("DOCUMENT_REF_ID", "13");
    // formdata.append("DOCUMENT_ADMIN_USERNAME", "deepanshu1");
    setPostImage({ myFile: formdata });
    console.table("deepanshu===========Hoooooo=========>" ,DocData.COMPANY_PARENT_USERNAME)
  };

  //get all Document
  const getalldocument = () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("authorization_key", "qzOUsBmZFgMDlwGtrgYypxUz");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        // DOCUMENT_REF_ID: DocData.COMPANY_PARENT_ID,
        // DOCUMENT_ADMIN_USERNAME: DocData.COMPANY_USERNAME,
        DOCUMENT_REF_ID: DocData.COMPANY_PARENT_ID,
        DOCUMENT_ADMIN_USERNAME: DocData.COMPANY_PARENT_USERNAME,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("/api/get_all_document", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // Assuming setImagesData is a state-setting function for a React component
          setImagesData(data);
          console.log("setimages:======", data[0]);
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

  const handleDownload = async (documentId, fileName) => {
    try {
      const data = JSON.stringify({
        DOCUMENT_ID: documentId,
        DOCUMENT_ADMIN_USERNAME: DocData.COMPANY_PARENT_USERNAME,
      });

      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "/api/download_document",
  
        data: data,
      };

      const response = await axios.request(config);
      console.log(response.data);
      downloadFile(response.data, fileName);
      // console.log(FileDownload(response.data))
    } catch (error) {
      console.log(error);
    }
  };
  const toggleDocumentsList = () => {
    setShowDocuments((prevShow) => !prevShow);
  };


  return (
    <>
      <Box>
        <Box>
          {/* Hidden file input */}
          <input
            type="file"
            label="Image"
            name="myFile"
            className="font-monospace"
            accept=".jpeg, .png, .jpg, .pdf"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e)}
          />
          {/* Upload document button */}
          <Button
            variant="contained"
            className="button rounded-2 lowercase"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            New document &nbsp;
            <ArrowCircleUpIcon fontSize="small" />
          </Button>
          &nbsp;&nbsp;
          {/* New document button */}
          <Button
            variant="outlined"
            className="button rounded-2 lowercase"
            onClick={handleSubmit}
          >
            Upload document&nbsp;
            <AddIcon fontSize="small" />
          </Button>
        </Box>
      </Box>

      <hr />

      <div cla>
        <h4 className="font-monospace">Uploaded Documents</h4>
        <Button
        variant="outlined"
        className="button rounded-2 lowercase "
        onClick={() => setShow((s) => !s)}
      >
        Show All Documents&nbsp;
        <ViewListIcon fontSize="small" />
      </Button>
      
  <ul className="Doc_ul" >
    {!show ? (
      imagesData.result?.slice(0, 8).map((docs, index) => {
        const fileName = docs.DOCUMENT_FILEDATA.originalname;
        const fileType = fileName.split(".").pop().toLowerCase();
        const isPDF = fileType === "pdf";
        const isJPG = fileType === "jpg" || fileType === "jpeg";

        return (
          <li className="Doc_li" key={index}>
            <span className="Docfile-icon">
              {" "}
              {isPDF ? (
                <img src={pdf} />
              ) : isJPG ? (
                <img src={jpg} />
              ) : (
                <img src={png} />
              )}
            </span>
            <span className="Docfile-name font-monospace">
              {fileName.length > 15
                ? `${fileName.substring(0, 10)}...`
                : fileName}
            </span>
            <button
              className="doc_anchor font-monospace"
              onClick={() => handleDownload(docs.DOCUMENT_ID, fileName)}
            >
              Download
            </button>
          </li>
        );
      })
    ) : (
      imagesData.result?.map((docs, index) => {
        const fileName = docs.DOCUMENT_FILEDATA.originalname;
        const fileType = fileName.split(".").pop().toLowerCase();
        const isPDF = fileType === "pdf";
        const isJPG = fileType === "jpg" || fileType === "jpeg";

        return (
          <li className="Doc_li" key={index}>
            <span className="Docfile-icon">
              {" "}
              {isPDF ? (
                <img src={pdf} />
              ) : isJPG ? (
                <img src={jpg} />
              ) : (
                <img src={png} />
              )}
            </span>
            <span className="Docfile-name font-monospace">
              {fileName.length > 15
                ? `${fileName.substring(0, 10)}...`
                : fileName}
            </span>
            <button
              className="doc_anchor font-monospace"
              onClick={() => handleDownload(docs.DOCUMENT_ID, fileName)}
            >
              Download
            </button>
          </li>
        );
      })
    )}
  </ul>
  <hr></hr>
      </div>
    </>
  );
}