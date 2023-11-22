// import React,{useState} from 'react'
// import axios from "axios";
// import { useEffect } from 'react';

//  const FileInput = () => {
// const [dataApi, setDataApi] = useState({})

//   let data = JSON.stringify({
//     "DOCUMENT_REF_ID": 12,
//     "DOCUMENT_ADMIN_USERNAME": "deepanshu1"
//   });
  
//   let config = {
//     method: 'put',
//     maxBodyLength: Infinity,
//     url: 'http://3.84.137.243:5001/get_all_document',
//     headers: { 
//       'authorization_key': 'qzOUsBmZFgMDlwGtrgYypxUz', 
//       'Content-Type': 'application/json'
//     },
//     data : data
//   };
  
// useEffect(()=>{
//   axios.request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//     setDataApi(response)
//   })
//   .catch((error) => {
//     console.log(error);
//   },[]);
// })
  
//   return (
//   <>
  
  
// <p>{dataApi}</p>
  
//   </>
//   )}
//   export default FileInput;
// // } export default ;













import React, { useState } from 'react';
import axios from 'axios';

const UploadUi = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post('/api/create_document', formData)
        .then((response) => {
          // Handle the response from the API
          console.log(response.data);
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error(error);
        });
    }
  };

  return (
    <form id="file-upload-form" className="uploader">
      <input
        id="file-upload"
        type="file"
        name="fileUpload"
        accept="image/*"
        onChange={handleFileChange}
      />

      <label htmlFor="file-upload" id="file-drag">
      <i className="fa fa-download" aria-hidden="true"></i>
      <img id="file-image" src="#" alt="Preview" className="hidden"/>

      </label>

      <button
        id="file-upload-btn"
        className="btn btn-primary"
        onClick={handleUpload}
      >
        Select a file
      </button>
      <div id="response" className="hidden">
      <div id="messages"></div>
      <progress className="progress" id="file-progress" value="0">
        <span>0</span>%
      </progress>
    </div>
    </form>
  );
};

export default UploadUi;
