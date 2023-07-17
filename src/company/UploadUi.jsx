import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";

import "../assests/css/document.css";

export default function ProjectUpload(props) {
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const [imagesData, setImagesData] = useState({});
  console.log("Images data is here:=>", imagesData.result);

  useEffect(()=>{
    getalldocument();
  },[])
  const headers = {
    "Content-Type": "multipart/form-data",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios
      .post("http://3.84.137.243:5001/create_document", postImage.myFile, {
        headers,
      })
      .then((response) => {
        console.log("response data:", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("DOCUMENT_REF_ID", "12");
    formdata.append("DOCUMENT_ADMIN_USERNAME", "deepanshu1");
    setPostImage({ myFile: formdata });
  };

  // gettting the image dta

  // const getalldocument = () => {
  //   try {
  //     console.log(";;;++++++++++++++++");
  //     // const response = await axios.put(
  //     //   "http://3.84.137.243:5001/get_all_document",
  //     //   {
  //     //     DOCUMENT_REF_ID_1: 12,
  //     //     DOCUMENT_ADMIN_USERNAME_1: "deepanshu1",
  //     //   },
  //     //   { headers }
  //     // );
  //     // // setTimeout(() => {
  //     // const imageApiData = response.data;
  //     // setImagesData(imageApiData.data);
  //     // console.log("my data=:", imageApiData);
  //     // // }, 1000);

  //     var myHeaders = new Headers();
  //     myHeaders.append("authorization_key", "qzOUsBmZFgMDlwGtrgYypxUz");
  //     myHeaders.append("Content-Type", "application/json");

  //     var raw = JSON.stringify({
  //       DOCUMENT_REF_ID: 12,
  //       DOCUMENT_ADMIN_USERNAME: "deepanshu1",
  //     });

  //     var requestOptions = {
  //       method: "PUT",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     fetch("http://3.84.137.243:5001/get_all_document", requestOptions)
  //       .then((response) => response)
  //       .then((result) => {
  //         console.log(result);
  //         setImagesData(()=> result);
  //         console.log("setimages:======", result[0]);
  //       })

  //       .catch((error) => console.log("error", error));
  //   } catch (error) {
  //     console.log("Error Fetching Data :", error);
  //   }
  // };

  const getalldocument = () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("authorization_key", "qzOUsBmZFgMDlwGtrgYypxUz");
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        DOCUMENT_REF_ID: 12,
        DOCUMENT_ADMIN_USERNAME: "deepanshu1",
      });
  
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch("http://3.84.137.243:5001/get_all_document", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
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

  return (
    <>
      <div>
        <h4>Upload Documents</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            label="Image"
            name="myFile"
            accept=".jpeg, .png, .jpg, .pdf"
            onChange={(e) => handleFileUpload(e)}
          />

          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>

      <hr />
     
      <h4>Download Documents</h4>
      <ul className="Doc_ul">
        {imagesData.result?.map((docs) => {
         return(
          <li className="Doc_li">
          <span className="Docfile-icon">📄</span>
          <span className="Docfile-name">{docs.DOCUMENT_ID}</span>
          <a href="path/to/Document1.pdf" download>
            Download
          </a>
        </li>
         )
        })}
      </ul>
    </>
  );
}
