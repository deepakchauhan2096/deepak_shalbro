import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import "../assests/css/document.css";
import pdf from "../assests/images/pdf.png";
import jpg from "../assests/images/jpg.jpg";
import png from "../assests/images/png.png";

export default function ProjectUpload(props) {
  // using useRef for the download link
  const downloadLinkRef = useRef(null);

  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const [imagesData, setImagesData] = useState({});
  const [show, setShow] = useState(false);
  console.log("Images data is here:=>", imagesData.result);

  // getting all document data using useEffect on each render
  useEffect(() => {
    getalldocument();
  }, []);

  const headers = {
    "Content-Type": "multipart/form-data",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  // Creating the document in mongo
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

  //selecting file through input tag
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("DOCUMENT_REF_ID", "12");
    formdata.append("DOCUMENT_ADMIN_USERNAME", "deepanshu1");
    setPostImage({ myFile: formdata });
  };

  // gettting the image data
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

  // Downloading the documents
  // const handleDownload = async (documentId) => {
  //   try {
  //     const data = JSON.stringify({
  //       DOCUMENT_ID: documentId,
  //       DOCUMENT_REF_ID: 12,
  //       DOCUMENT_ADMIN_USERNAME: "deepanshu1",
  //     });

  //     const config = {
  //       method: "put",
  //       maxBodyLength: Infinity,
  //       url: "http://3.84.137.243:5001/download_document",
  //       headers: {
  //         authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };

  //     const response = await axios.request(config);
  //     console.log(response.data);

  //     // Trigger the download process using the response data
  //     // The actual download link is provided by the API response
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = response.data.url;
  //     downloadLink.setAttribute("download", response.data.fileName);
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDownload = async (documentId) => {
    try {
      let data = JSON.stringify({
        DOCUMENT_ID: documentId,
        DOCUMENT_REF_ID: 12,
        DOCUMENT_ADMIN_USERNAME: "deepanshu1",
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://3.84.137.243:5001/download_document",
        headers: {
          authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log("new image data",response.data);

      // Set the download link attributes and trigger the click event
      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = response.data.url;
        downloadLinkRef.current.download = response.data.docs.DOCUMENT_FILEDATA.originalname;
        downloadLinkRef.current.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

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

          <button onClick={handleSubmit} className="font-monospace">
            Submit
          </button>
        </form>
      </div>

      <hr />

      <div>
        <h4 className="font-monospace">
          Uploaded Documents{" "}
          <span
            onClick={() => setShow((s) => !s)}
            role="button"
            className="showdocbtn"
          >
            Show Document
          </span>
        </h4>

        <ul className="Doc_ul" style={{ display: show ? "none" : "flex" }}>
          {imagesData.result?.map((docs, index) => {
            const fileName = docs.DOCUMENT_FILEDATA.originalname;
            const fileType = fileName.split(".").pop().toLowerCase();
            const isPDF = fileType === "pdf";
            const isJPG = fileType === "jpg" || fileType === "jpeg";
            return (
              <li className="Doc_li" key={index}>
                {/* <span className="Docfile-icon">📄</span> */}
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
                  {docs.DOCUMENT_FILEDATA.originalname.length > 15
                    ? `${docs.DOCUMENT_FILEDATA.originalname.substring(
                        0,
                        10
                      )}...`
                    : docs.DOCUMENT_FILEDATA.originalname}
                </span>

                <button
                  className="doc_anchor font-monospace"
                  onClick={(e) => handleDownload(docs.DOCUMENT_ID)}
                >
                  Download
                </button>

                {/* Hidden download link */}
                <a ref={downloadLinkRef} style={{ display: "none" }}>
                  Hidden download link
                </a>
              </li>
            );
          })}
        </ul>
     

        <hr></hr>
      </div>
    </>
  );
}


