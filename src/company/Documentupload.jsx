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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import env from "react-dotenv";

export default function ProjectUpload(props) {
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imagesData, setImagesData] = useState({});
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [fileSelected, setFileSelected] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const DocData = props.empData;
  // console.log("DocData", DocData)

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
      .post("http://54.243.89.186:5001/create_document", postImage.myFile, {
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

      fetch("http://54.243.89.186:5001/get_all_document", requestOptions)
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
        url: "http://54.243.89.186:5001/download_document",
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
      url: `http://54.243.89.186:5001/delete_document/${documentId}`,
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


  }}

