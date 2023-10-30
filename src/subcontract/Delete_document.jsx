// import React, { useState } from 'react';
// import axios from 'axios';
// import env from "react-dotenv";

// const Delete_document = () => {
//   const [documentId, setDocumentId] = useState('');
//   const [responseMessage, setResponseMessage] = useState('');

//   const handleDelete = () => {
//     axios.delete("/delete_document/${documentId}")
//       .then(response => {
//         if (response.data.operation === "success") {
//           setResponseMessage("Document successfully deleted!");
//         } else {
//           setResponseMessage("Failed to delete document. Error message: " + response.data.errorMsg);
//         }
//       })
//       .catch(error => {
//         setResponseMessage("An error occurred: " + error.message);
//       });
//   };

//   return (
//     <div>
//       <h1>Delete Documents</h1>
//       <div>
//         <label htmlFor="documentId">Document ID:</label>
//         <input type="text" id="documentId" value={documentId} onChange={(e) => setDocumentId(e.target.value)} />
//         <button onClick={handleDelete}>Delete</button>
//       </div>
//       <div>
//         {responseMessage && <p>{responseMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default Delete_document;
