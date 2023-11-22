import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import "../assests/css/document.css";
import pdf from "../assests/images/pdf.png";
import jpg from "../assests/images/jpg.png";
import png from "../assests/images/png.png";

export default function ProjectUpload(props) {

  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const [imagesData, setImagesData] = useState({});
  const [show, setShow] = useState(false);
  console.log("Images data is here:=>", imagesData.result);

  useEffect(() => {
    getalldocument();
  }, []);

  const downloadLinkRef = useRef(null);

  const headers = {
    "Content-Type": "multipart/form-data",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const downloadFile = (base64Data, fileName) => {
    const link = document.createElement('a');
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
//upload document throught input
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("DOCUMENT_REF_ID", "12");
    formdata.append("DOCUMENT_ADMIN_USERNAME", "deepanshu1");
    setPostImage({ myFile: formdata });
  };

  //get all Document
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

  const handleDownload = async (documentId,fileName) => {
    try {
      const data = JSON.stringify({
        DOCUMENT_ID: documentId,

        DOCUMENT_ADMIN_USERNAME: "deepanshu1",
      });

      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://3.84.137.243:5001/download_document',
        headers: {
          'authorization_key': 'qzOUsBmZFgMDlwGtrgYypxUz',
          'Content-Type': 'application/json'
        },
        data: data
      };

      const response = await axios.request(config);
      console.log(response.data);
      downloadFile(response.data,fileName)
      // console.log(FileDownload(response.data))

   
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h4 className="font-monospace">Upload Documents</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            label="Image"
            name="myFile"
            className="font-monospace"
            accept=".jpeg, .png, .jpg, .pdf"
            onChange={(e) => handleFileUpload(e)}
          />

          <button onClick={handleSubmit} className="font-monospace">Submit</button>
        </form>
      </div>

      <hr />

      <div>
        <h4 className="font-monospace">Uploaded Documents</h4>

        <ul className="Doc_ul" style={{ display: show ? "none" : "flex"}}>
          {imagesData.result?.map((docs, index) => {
            const fileName = docs.DOCUMENT_FILEDATA.originalname;
            const fileType = fileName.split('.').pop().toLowerCase();
            const isPDF = fileType === 'pdf';
            const isJPG = fileType === 'jpg' || fileType === 'jpeg';

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
                  {fileName.length > 15 ? `${fileName.substring(0, 10)}...` : fileName}
                </span>
                <button
                  className="doc_anchor font-monospace"
                  onClick={() => handleDownload(docs.DOCUMENT_ID,fileName)}
                >
                  Download
                </button>

                <a
                  ref={downloadLinkRef}
                  style={{ display: "none" }}
                >
                  Hidden download link
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}