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
// import DocumentModal from "./components/DocumentModal";
import DocumentCreate from "./DocumentCreate";
// import env from "react-dotenv";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
    Paper,
  } from "@mui/material";
import { ViewCompact } from "@mui/icons-material";
export default function Document(props) {

    const [selectedFileName, setSelectedFileName] = useState("");
    const [imagesData, setImagesData] = useState({
        DOCUMENT_ID: "",
        DOCUMENT_ADMIN_USERNAME: "",
    });
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [fileSelected, setFileSelected] = useState(false);
    const [showAllDocuments, setShowAllDocuments] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const DocData = props.empData;


    const { id } = useParams();
    const param = id.split("&");
    const COMPANY_ID = param[0];
    const COMPANY_USERNAME = param[1];
    const COMPANY_PARENT_ID = param[2];
    const COMPANY_PARENT_USERNAME = param[3];
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

    const MyScreen = styled(Paper)((props) => ({
        height: "calc(100vh - 32px)",
        padding: 0,
        paddingBottom: "0",
        overflow: "auto",
        borderRadius: 0,
        Border: 0,
        display: props.screenIndex ? "block" : "none",
      }));

    const handleClick = (event) => {
        // setPostImage(event);
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
                DOCUMENT_REF_ID: COMPANY_ID,
                DOCUMENT_ADMIN_USERNAME: COMPANY_PARENT_USERNAME,
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
                    // setTimeout(()=> {
                        setImagesData(data.result);
                    // setTotalDocuments(data.result?.length || 0);
                    console.log(data,"data document")
                    // }, 2000)
                    
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
                DOCUMENT_ADMIN_USERNAME: COMPANY_PARENT_USERNAME,
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
            "DOCUMENT_ADMIN_USERNAME": COMPANY_PARENT_USERNAME
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


    const columns = [
        { field: 'filename', headerName: 'ID', width: 90 },
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
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];

    const rows =  imagesData.map(e => e.DOCUMENT_FILEDATA)
    console.log(rows ,"roooo")

    return (
        <>

            <Sidebar
                COMPANY_ID={COMPANY_ID}
                COMPANY_USERNAME={COMPANY_USERNAME}
                COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                active={4}
            />
            <Box className="box" >

                {/* <DocumentCreate
                    name={"Employee"}
                mainData={allempData}
                /> */}

                <MyScreen sx={{ display: "block", padding: 3 }}>
                    <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.filename}
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
                </MyScreen>
            </Box>


            <SimpleBackdrop open={backdrop} />

        </>
    );
}
