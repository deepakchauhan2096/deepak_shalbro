// import React, { useState, useEffect,useRef } from "react";
// import Box from "@mui/material/Box";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AddCompany from "../modal/AddCompany";
// import { Button, ButtonGroup, Paper, Skeleton } from "@mui/material";
// import CircularProgress from "@mui/material/CircularProgress";
// import { styled } from "@mui/material/styles";
// import CloseIcon from "@mui/icons-material/Close";
// import Mymenu from "../components/Menus";

// const ContractSrc = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [updateEvent, setUpdateEvent] = useState([]);

//   const [tableRows, setTableRows] = useState(
//     {
//       COMPANY_ID: 19,
//       COMPANY_USERNAME: "company1",
//     },
//   );
//   const fileInputRef = useRef(null);

//   const [updatedata, setUpdateData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, [updatedata]);

//   const headers = {
//     "Content-Type": "application/json",
//     authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
//   };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.put(
  //       "http://3.84.137.243:5001/get_all_company",
  //       { COMPANY_PARENT_ID: 18, COMPANY_PARENT_USERNAME: "deepanshu1" },
  //       { headers }
  //     );
  //     setTimeout(() => {
  //       console.log("response.data : ", response.data);
  //       const data = response.data;
  //       console.log("first1", data);
  //       setTableRows(data.result);
  //     }, 1000);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // };

//   const [filterData, setFilteredData] = useState({
//     row: {
//       _id: "64953f89450d9b0a7b4271e5",
//       COMPANY_ID: 20,
//       COMPANY_PARENT_ID: 18,
//       COMPANY_PARENT_USERNAME: "deepanshu1",
//       COMPANY_ROLE: "editor",
//       COMPANY_NAME: "comp1",
//       COMPANY_PHONE: 9876543,
//       COMPANY_EMAIL: "comp1@gmail.com",
//       COMPANY_ADD2: "HEELO",
//       COMPANY_USERNAME: "company12",
//       COMPANY_STATE: "",
//       COMPANY_EMPLOYIES: [],
//       __v: 0,
//     },
//   });

//   const [open, setOpen] = React.useState(false);
//   const [index, setIndex] = useState(1);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

 




//   const handleClick = (event) => {
//     setFilteredData(event);
//     handleOpen();
//   };



 
//   const columns = [
//     // { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "COMPANY_ID",
//       headerName: "ID",
//       width: 20,
//       // editable: true,
//     },
//     {
//       field: "COMPANY_USERNAME",
//       headerName: "USERNAME",
//       width: 120,
//       // editable: true,
//     },
//     {
//       field: "COMPANY_NAME",
//       headerName: "NAME",
//       width: 180,
//       // editable: true,
//     },
//     {
//       field: "COMPANY_EMAIL",
//       headerName: "E-MAIL",
//       width: 180,
//       // editable: true,
//     },
//     {
//       field: "COMPANY_ADD2",
//       headerName: "ADDRESS",
//       width: 200,
//       // editable: true,
//     },
//     {
//       field: "COMPANY_ROLE",
//       headerName: "ROLE",
//       width: 80,
//       // editable: true,
//     },
//     {
//       field: "COMPANY_STATE",
//       headerName: "STATE",
//       width: 80,
//       // editable: true,
//     },
//     {
//       field: "COMPANY_PHONE",
//       headerName: "CONTACT",
//       width: 120,
//       // editable: true,
//     },

//     {
//       field: "action",
//       headerName: "Detail",
//       width: 120,
//       renderCell: (cellValues) => {
//         return (
//           <Button
//             variant="contained"
//             className="view-btn primary btn btn-success"
//             style={{ padding: "2px 2px" }}
//             onClick={(event) => {
//               handleClick(cellValues);
//             }}
//           >
//             view
//           </Button>
//         );
//       },
//     },
//   ];

//   function downloadPDF(pdf) {
//     const linkSource = `data:application/pdf;base64,${pdf}`;
//     const downloadLink = document.createElement("a");
//     const fileName = "abc.pdf";
//     downloadLink.href = linkSource;
//     downloadLink.download = fileName;
//     downloadLink.click();
//   }
//   const updateCompany = (event) => {
//     setUpdateEvent(event);
//   };

//   const MyScreen = styled(Paper)((props) => ([{
//     height: "calc(100vh - 37px)",
//     padding: 0,
//     paddingBottom: "0",
//     overflow: "auto",
//     borderRadius: 0,
//     Border: 0,
//     display: props.screenIndex ? "block" : "none",
//   }]));

//   const updateDate = (event) => {
//     setUpdateData(event);
//     console.log(event, "event");
//   };

//   const Animations = () => {
//     return (
//       <Box sx={{ width: "100%" }}>
//         <Skeleton animation="pulse" height={60} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//       </Box>
//     );
//   };

//   console.log("company data table: =>", tableRows);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     // Do something with the selected file, such as uploading it
//     // You can access the file using 'file' variable

//     // Example: Log the file name to the console
//     console.log(file.name);
//   };
//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <>
//       <Box className="box">
//         <AddCompany update={(event) => updateDate(event)} name={"Company"} />
//         <MyScreen sx={{ display: "block", padding: 3 }}>
//           <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
//             {isLoading ? (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%,-50%)",
//                 }}
//               >
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <DataGrid
//                 sx={{ border: "none" }}
//                 rows={tableRows}
//                 columns={columns}
//                 getRowId={(row) => row.COMPANY_ID}
//                 initialState={{
//                   pagination: {
//                     paginationModel: {
//                       pageSize: 20,
//                     },
//                   },
//                 }}
//                 density="compact"
//                 pageSizeOptions={[5]}
//                 checkboxSelection
//                 disableRowSelectionOnClick
//               />
//             )}
//           </Box>
//         </MyScreen>
//       </Box>

//       <Box
//         style={{
//           display: open ? "block" : "none",
//         }}
//         className="box position-absolute overflow-auto"
//       >
//         <div className="container-fluid pb-0 g-0 position-sticky top-0">
//           <Button
//             onClick={handleClose}
//             variant="contained"
//             className="btn rounded-0"
//           >
//             <ArrowBackIcon style={{ fontSize: "25px" }} />
//           </Button>
//           {[
//             "Details",
//             "Policies",
//             "Compliance Documents",
//             "Insurance",
//             "law suits",
//           ].map((item, value) => (
//             <Button
//               onClick={(e, index) => setIndex(value)}
//               variant={index === value ? "outlined" : "contained"}
//               className="btn rounded-0 border-0"
//             >
//               {item}
//             </Button>
//           ))}
//           <Mymenu />
//           <Button
//             onClick={handleClose}
//             variant={"contained"}
//             className="btn rounded-0 border border-top-0 border-bottom-0"
//             color="error"
//             style={{ position: "absolute", right: "0" }}
//           >
//             {<CloseIcon />}
//           </Button>
//         </div>

//         <MyScreen screenIndex={index === 0} sx={{ padding: 3 }}>
//           <div className="box-tab">
//             <div className="container-fluid p-4">
//               <div className="row">
//                 <div className="col">
//                   <b>ID</b>
//                   <p className="bg-light text-dark px-2 rounded-4">
//                     {filterData.row.COMPANY_ID}
//                   </p>
//                 </div>
//                 <div className="col">
//                   <b>Username</b>
//                   <p className="bg-light text-dark px-2 rounded-4">
//                     {filterData.row.COMPANY_USERNAME}
//                   </p>
//                 </div>
//                 <div className="col">
//                   <b> Company Name</b>
//                   <p className="bg-light text-dark px-2 rounded-4">
//                     {filterData.row.COMPANY_NAME}
//                   </p>
//                 </div>
//                 <div className="col">
//                   <b>Phone</b>
//                   <p className="bg-light text-dark px-2 rounded-4">
//                     {filterData.row.COMPANY_PHONE}
//                   </p>
//                 </div>
//                 <div className="col">
//                   <b>State</b>
//                   <p className="bg-light text-dark px-2 rounded-4">
//                     {filterData.row.COMPANY_STATE}
//                   </p>
//                 </div>
//               </div>

//               <hr />

//               <div className="row">
//                 <div className="col">
//                   <b>City</b>
//                   <p className="bg-light text-dark px-2 rounded-4">
//                     {filterData.row.CITY}
//                   </p>
//                 </div>

//                 <div className="col">
//                   <b>E-mail</b>
//                   <p className="bg-light text-dark px-2 rounded-4">
//                     {filterData.row.COMPANY_EMAIL}
//                   </p>
//                 </div>

//                 <div className="col">
//                   <b>Project Start</b>
//                   <p className="bg-light text-dark px-2 rounded-4">
//                     {filterData.row.COMPANY_ROLE}
//                   </p>
//                 </div>
//                 <div className="col">
//                   <b>Address</b>
//                   <p className="bg-light text-dark px-2 rounded-4">
//                     {filterData.row.COMPANY_ADD2}
//                   </p>
//                 </div>
//               </div>
//               <hr />
//               <div className="row">
//                 <div className="col">
//                   <b>Project Name</b>
//                   <select
//                     className="border-none rounded-3 bg-light"
//                     style={{
//                       width: "100%",
//                       height: "22px",
//                       lineHeight: "0",
//                       paddingTop: "0",
//                       border: "none",
//                       outline: "none",
//                     }}
//                   >
//                     <option value="sun Tower">sun Tower</option>
//                     <option value="sun Tower">School</option>
//                     <option value="sun Tower">temple</option>
//                     <option value="sun Tower">star city</option>
//                     <option value="sun Tower">bridge</option>
//                   </select>
//                 </div>
//                 <div className="col">
//                   <b>Client</b>
//                   <p className="bg-light text-dark px-2 rounded-4">L&T</p>
//                 </div>
//                 <div className="col">
//                   <b>Project Status</b>
//                   <p className="bg-success text-white px-2 rounded-4">
//                     In Execution
//                   </p>
//                 </div>
//               </div>
//               {/* 
//                 <div className="row">
//                   <div className="col">
//                     <b>Project Progress</b>
//                     <div className="p-2 rounded-3 bg-light">
//                       <div
//                         className="progress-bar"
//                         style={{
//                           background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(hotpink ${filterData.row.projectprogress}, pink 0)`,
//                         }}
//                       >
//                         <div className="counter">
//                           {filterData.row.projectprogress}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div> */}

//               <hr />

//               {/* <div className="row">
//                   <div className="col-3">
//                     <b>Cost Breakdown</b>
//                     <div className="bg-light rounded-3 pb-2">
//                       <div className="px-2 py-1 rounded-3 bg-light">
//                         <div>
//                           Material - <b>2365$</b>
//                         </div>
//                         <div
//                           style={{
//                             background: "grey",
//                             content: "",
//                             height: "12px",
//                             width: "100%",
//                           }}
//                         >
//                           <div
//                             style={{
//                               background: "aqua",
//                               content: "",
//                               height: "12px",
//                               width: "50%",
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div className="px-2 py-1 rounded-3 bg-light">
//                         <div>
//                           Labour - <b>365$</b>
//                         </div>
//                         <div
//                           style={{
//                             background: "grey",
//                             content: "",
//                             height: "12px",
//                             width: "100%",
//                           }}
//                         >
//                           <div
//                             style={{
//                               background: "red",
//                               content: "",
//                               height: "12px",
//                               width: "59%",
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div className="px-2  py-1 rounded-3 bg-light">
//                         <div>
//                           Equipments - <b>2365$</b>
//                         </div>
//                         <div
//                           style={{
//                             background: "grey",
//                             content: "",
//                             height: "12px",
//                             width: "100%",
//                           }}
//                         >
//                           <div
//                             style={{
//                               background: "green",
//                               content: "",
//                               height: "12px",
//                               width: "90%",
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div> */}
//             </div>
//           </div>
//         </MyScreen>
//         <MyScreen screenIndex={index === 1} sx={{ padding: 3 }}>
//           <div className="box-tab">
//             <div className="p-4 container-fluid">
//               <div className="row">
//                 Company Policy: Demo Corporation Effective Date: [Insert Date]
//                 1. Introduction At Demo Corporation, we strive to create a
//                 positive and productive work environment for all our employees.
//                 This company policy serves as a guide to establish clear
//                 expectations, standards, and guidelines for everyone associated
//                 with the organization. It is important to familiarize yourself
//                 with this policy and adhere to it to ensure a harmonious and
//                 successful work experience. 2. Code of Conduct 2.1
//                 Professionalism and Respect All employees are expected to
//                 conduct themselves professionally, treating colleagues, clients,
//                 and customers with respect and courtesy. Discrimination,
//                 harassment, or any form of disrespectful behavior will not be
//                 tolerated. 2.2 Confidentiality and Data Security Employees must
//                 maintain the confidentiality of sensitive company information,
//                 trade secrets, and client data. Unauthorized disclosure or
//                 misuse of such information is strictly prohibited. Employees
//                 must adhere to our data security protocols and report any
//                 potential security breaches immediately. 2.3 Conflict of
//                 Interest Employees are required to disclose any conflicts of
//                 interest that may arise between their personal interests and the
//                 company's interests. Such conflicts should be reported to the
//                 appropriate authority, and steps will be taken to mitigate any
//                 potential risks. 3. Work Environment 3.1 Health and Safety Demo
//                 Corporation is committed to providing a safe and healthy work
//                 environment for all employees. It is the responsibility of each
//                 employee to follow safety guidelines, report hazards, and
//                 cooperate with any health and safety initiatives implemented by
//                 the company. 3.2 Substance Abuse The use, possession, or
//                 distribution of illegal drugs or alcohol while on company
//                 premises or during working hours is strictly prohibited.
//                 Employees found to be in violation of this policy will be
//                 subject to disciplinary action, which may include termination.
//                 3.3 Workplace Violence Any form of violence, threats, or
//                 intimidation in the workplace will not be tolerated. Employees
//                 should report any incidents or concerns to their supervisor or
//                 the Human Resources department immediately. 4. Employment
//                 Policies 4.1 Equal Employment Opportunity Demo Corporation
//                 provides equal employment opportunities to all individuals
//                 without regard to race, color, religion, gender, national
//                 origin, age, disability, or any other protected status under
//                 applicable laws. We are committed to promoting diversity and
//                 inclusivity in our workforce. 4.2 Anti-Harassment Demo
//                 Corporation strictly prohibits any form of harassment, including
//                 but not limited to sexual harassment, verbal abuse, or offensive
//                 behavior. All employees have the right to work in an environment
//                 free from harassment, and any complaints will be promptly and
//                 thoroughly investigated. 4.3 Leave and Time Off Employees are
//                 entitled to various types of leave, including vacation, sick
//                 leave, and personal leave, as outlined in our leave policy.
//                 Requests for time off should be submitted and approved in
//                 accordance with the company's procedures. 5. Compliance with
//                 Laws and Regulations Demo Corporation is committed to upholding
//                 all applicable laws and regulations.
//               </div>
//             </div>
//           </div>
//         </MyScreen>
//         <MyScreen screenIndex={index === 2} sx={{ padding: 3 }}>
//         <div className="box-tab">
//           <div className="p-4 container-fluid">
//             <div className="row">
//               <div className="col-9">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th scope="col">Material</th>
//                       <th scope="col">Quantity</th>
//                       <th scope="col">Amount</th>
//                       <th scope="col">Method</th>
//                       <th scope="col">Transaction ID</th>
//                       <th scope="col">Status</th>
//                       <th scope="col">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Tiles</td>
//                       <td>10</td>
//                       <td>20 USD</td>
//                       <td>Cash</td>
//                       <td>RG384054859</td>
//                       <td>
//                         <b className="bg-success text-white px-2 rounded-2">
//                           Paid
//                         </b>
//                       </td>
//                       <td>12-10-2020</td>
//                     </tr>
//                     <tr>
//                       <td>Cement</td>
//                       <td>20</td>
//                       <td>20 USD</td>
//                       <td>UPI</td>
//                       <td>TY485060</td>
//                       <td>
//                         <b className="bg-warning text-white px-2 rounded-2">
//                           Panding
//                         </b>
//                       </td>
//                       <td>12-10-2020</td>
//                     </tr>
//                     <tr>
//                       <td>Concrete</td>
//                       <td>60</td>
//                       <td>20 USD</td>
//                       <td>Stripe</td>
//                       <td>PO6970845</td>
//                       <td>
//                         <b className="bg-success text-white px-2 rounded-2">
//                           Paid
//                         </b>
//                       </td>
//                       <td>12-10-2020</td>
//                     </tr>
//                     <tr>
//                       <td>Bricks</td>
//                       <td>120</td>
//                       <td>the Bird</td>
//                       <td>Visa</td>
//                       <td>PO697084599</td>
//                       <td>
//                         <b className="bg-danger text-white px-2 rounded-2">
//                           Failed
//                         </b>
//                       </td>
//                       <td>12-10-2020</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <div className="col-3 px-4">
//                 <div className="mb-5 ">
//                   <button className="btn btn-primary float-right rounded-0">
//                     <i className="fa fa-print"></i> Print Invoice
//                   </button>
//                 </div>
//                 <div className="search-container mb-5">
//                   <input type="text" placeholder="Search.." name="search" />
//                   <button type="submit">
//                     <i className="fa fa-search"></i>
//                   </button>
//                 </div>

//                 <div>
//                   <b>Time Period</b>
//                 </div>
//                 <div>
//                   <div className="form-check py-1">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault1"
//                     />
//                     <label className="form-check-label" for="flexRadioDefault1">
//                       All time
//                     </label>
//                   </div>
//                   <div className="form-check py-1">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault2"
//                       checked
//                     />
//                     <label className="form-check-label" for="flexRadioDefault2">
//                       Today
//                     </label>
//                   </div>

//                   <div className="form-check py-1">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault2"
//                     />
//                     <label className="form-check-label" for="flexRadioDefault2">
//                       This Week
//                     </label>
//                   </div>

//                   <div className="form-check py-1">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault2"
//                     />
//                     <label className="form-check-label" for="flexRadioDefault2">
//                       This month
//                     </label>
//                   </div>

//                   <div className="form-check py-1">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault2"
//                     />
//                     <label className="form-check-label" for="flexRadioDefault2">
//                       Custom
//                     </label>
//                   </div>
//                 </div>
//                 <b>Status</b>
//                 <div>
//                   <div className="form-check py-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       value=""
//                       id="flexCheckIndeterminate"
//                     />
//                     <label
//                       className="form-check-label"
//                       for="flexCheckIndeterminate"
//                     >
//                       Paid
//                     </label>
//                   </div>

//                   <div className="form-check py-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       value=""
//                       id="flexCheckIndeterminate"
//                     />
//                     <label
//                       className="form-check-label"
//                       for="flexCheckIndeterminate"
//                     >
//                       Panding
//                     </label>
//                   </div>

//                   <div className="form-check py-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       value=""
//                       id="flexCheckIndeterminate"
//                     />
//                     <label
//                       className="form-check-label"
//                       for="flexCheckIndeterminate"
//                     >
//                       Failed
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//        </MyScreen>
//        <MyScreen screenIndex={index === 3} sx={{ padding: 3 }}>
//         <div className="box-tab">
//           <div className="p-4 container-fluid">
//             <div className="row">insurances</div>
//           </div>
//         </div>
//        </MyScreen>
//        <MyScreen screenIndex={index === 4} sx={{ padding: 3 }}>
//         <div className="box-tab">
//           <div className="p-4 container-fluid">
//             <div className="row">law suits</div>
//           </div>
//         </div>
//         </MyScreen>
//     </Box>
//     </>
//   );
// };

// export default ContractSrc;
