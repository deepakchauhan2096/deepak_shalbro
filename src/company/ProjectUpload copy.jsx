import React, { useState } from "react";
import axios from "axios";

export default function ProjectUpload(props) {
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

const headers = {
  "Content-Type": "multipart/form-data",
  authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz"
}


  const handleSubmit = (e) => {
    console.log("on btn submit");
    e.preventDefault();
  
    axios
      .post("http://54.89.160.62:5001/create_document", postImage.myFile, {
        headers,
      })
      .then((response) => {
        console.log("response1 : ", response);
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    const FormData = require('form-data');
    let formdata = new FormData();
    formdata.append('file', file);
    // formdata.append('DOCUMENT_REF_ID', '12');
    formdata.append('DOCUMENT_ADMIN_USERNAME', 'deepanshu1');
    setPostImage({ myFile: formdata });
  };



  return (
    <div>
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
  );
}