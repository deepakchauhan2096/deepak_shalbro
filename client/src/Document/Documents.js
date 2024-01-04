import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Skeleton } from "@mui/material";
import moment from "moment-timezone";
import SimpleBackdrop from "../components/Backdrop";
// import "../assests/css/document.css"; // Import the CSS filefileN
import "../assests/css/document.css";
import { DataGrid } from '@mui/x-data-grid';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DocumentCreate from "./DocumentCreate";
// import env from "react-dotenv";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
    Paper,
} from "@mui/material";
import Navbar from "../components/Navbar";
import ExpiryReminder from "../components/ExpiryReminder";

// mui icons 

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { RotatingLines } from "react-loader-spinner";
import CreateDoc from "../components/documentdynamic/DocCreate";

export default function Document(props) {

    const [imagesData, setImagesData] = useState([]);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [backdrop, setBackdrop] = useState(false);
    const [deleteItem, setDeleteItem] = useState("");
    const [openNav, setOpenNav] = useState(false);
    const { COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME } = useParams();
    const [resStatus, setResStatus] = useState(false); //adding newline
    const [isLoading, setIsLoading] = useState(true);

    // const [display, setDisplay] = useState("unarchive")

    // console.log("COMPANYPARENT :", COMPANY_PARENT_USERNAME);

    const [open, setOpen] = React.useState(false);

    // let {endpoint} = props
    useEffect(() => {
        // console.log("heelo i am runnig useEffect")
        getalldocument();
    }, [deleteItem]);

    // function to download the file 
    const downloadFile = (base64Data, fileName) => {
        const link = document.createElement("a");
        link.href = `data:application/octet-stream;base64,${base64Data}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const apiEndpoint = "/api/create_document";
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
        handleOpen();
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const getalldocument = async () => {

        const requestData = {
            DOCUMENT_REF_ID: COMPANY_ID,
            DOCUMENT_ADMIN_USERNAME: COMPANY_PARENT_USERNAME
        };
        try {
            const response = await axios.put("/api/get_all_document", requestData);

            if (!response.data) {
                throw new Error("Response data is empty");
            }

            const data = response.data;
            // console.log("requestdata", data);
            setIsLoading(true);
            setResStatus(true);
            setImagesData(data);
            setIsLoading(false);
            setTotalDocuments(data.result?.length || 0);

            console.log("data documents", data.result);
        } catch (error) {
            setIsLoading(false);
            console.log("Error Fetching Data :", error);
        }
    };

    // Function to download the uploaded documents 
    const handleDownload = async (documentId, fileName) => {
        // console.log(documentId, fileName, "filename")
        try {
            const data = {
                DOCUMENT_ID: documentId,
                DOCUMENT_ADMIN_USERNAME: COMPANY_PARENT_USERNAME,
            };

            const config = {
                method: "put",
                maxBodyLength: Infinity,
                url: "/api/download_document",
                data: data,
            };

            const response = await axios.request(config);
            // console.log(response, fileName, "this is response")
            // console.log(fileName, "filename")
            downloadFile(response.data, fileName.name);


        } catch (error) {
            console.log(error);
        }

    };

    const handleDelDoc = async (e, documentId) => {
        // setBackdrop(true);
        setResStatus(true);
        // console.log(documentId);

        const data = {
            DOCUMENT_ID: documentId,
            DOCUMENT_ADMIN_USERNAME: COMPANY_PARENT_USERNAME,
        };
        // console.log("Data found 1:", data);

        try {
            const response = await fetch(`/api/delete_document/${documentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                // console.log("Response data found:", jsonResponse);
                setDeleteItem(jsonResponse);
                // setBackdrop(false);
                setResStatus(false);

                toast.success("Document Deleted successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            } else {
                // Handle the response for non-2xx status codes
                console.error(response.status, response.statusText);
                toast.error('Document not found!', {
                    // Show for 2 seconds
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while deleting the document.', {
                // Show for 2 seconds
            });
        }
    };


    // function for converting the files into kb and mb 
    const formatSize = (bytes) => {
        if (bytes >= 1048576) {
            return (bytes / 1048576).toFixed(2) + ' MB';
        } else if (bytes >= 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        } else {
            return bytes + ' Bytes';
        }
    };


    const getFileIcon = (fileType) => {
        const fileTypeLowerCase = fileType.toLowerCase();
        if (fileTypeLowerCase.includes('pdf')) {
            return <DescriptionIcon color="error" />;
        } else if (fileTypeLowerCase.includes('excel') || fileTypeLowerCase.includes('spreadsheet')) {
            return <InsertChartIcon color="primary" />;
        } else if (fileTypeLowerCase.includes('word') || fileTypeLowerCase.includes('document')) {
            return <AssignmentIcon color="primary" />;
        } else if (fileTypeLowerCase.includes('jpeg') || fileTypeLowerCase.includes('jpg')) {
            return <InsertPhotoIcon color="primary" />;
        } else if (fileTypeLowerCase.includes('csv')) {
            return <InsertDriveFileIcon color="primary" />;
        } else {
            return <InsertDriveFileIcon color="disabled" />;
        }
    };

    const renderDocumentNameCell = (cellValues) => {
        const { name, fileType } = cellValues.value;
        const icon = getFileIcon(fileType);

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {icon}
                <span style={{ marginLeft: '8px' }}>{name}</span>
            </div>
        );
    };

    const columns = [
        { field: 'sr', headerName: 'S No.', width: 60 },
        {
            field: 'documentName',
            headerName: 'Document Name',
            width: 180,
            renderCell: renderDocumentNameCell,
        },
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'documentSize',
            headerName: "Size",
            description: 'Document Size',
            width: 80,
            editable: false,
        },
        {
            field: 'uploadDate',
            headerName: 'Upload Date',
            type: 'number',
            width: 120,
            editable: false,

        },
        {
            field: 'documentExpDate',
            headerName: 'Expiry Date',
            description: 'Document Expiry Date',
            width: 120,
            editable: false,
        },
        {
            field: 'documentIdType',
            headerName: 'Document Type',
            description: 'Document Type',
            type: 'text',
            width: 150,
            editable: false,
        },

        {
            field: 'ExpiryDateStatus',
            headerName: 'Expiry Status',
            description: 'Document Expiry',
            sortable: false,
            width: 140,
            editable: false,
            renderCell: (cellValues) => {

                return (<ExpiryReminder data={cellValues?.value} />)
            },
            size: "small"


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
                        onClick={(e) => {
                            handleDownload(cellValues.id, cellValues.row.documentName);
                        }}
                    >
                        Download
                    </Button>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 100,


            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        className="view-btn "
                        color="error"
                        style={{ padding: "2px 2px" }}
                        onClick={(e) => {
                            handleDelDoc(e, cellValues.id);
                        }}
                    >
                        Delete
                    </Button>
                );
            },
        },
    ];


    // this is a new function using moment for date conversion 
    const formatDate = (dateString, withTimezone = false) => {
        const userTimeZone = moment.tz.guess();
        const date = moment(dateString).tz(userTimeZone);

        const formattedDate = withTimezone
            ? date.format("YYYY-MM-DD HH:mm:ss z") // Include time and timezone
            : date.format("YYYY-MM-DD"); // Date only

        return formattedDate;
    };


    // after new
    const rows = imagesData?.result?.map((item, index) => ({
        id: item.DOCUMENT_ID,
        sr: index + 1,
        documentName: {
            name: item.DOCUMENT_FILEDATA?.originalname || '',
            fileType: item.DOCUMENT_FILEDATA?.mimetype || '',
        },
        documentSize: formatSize(item.DOCUMENT_FILEDATA?.size) || '',
        uploadDate: formatDate(item.createdAt),
        documentType: item.DOCUMENT_FILEDATA?.mimetype || '',
        ExpiryDateStatus: formatDate(item.DOCUMENT_EXPIRY_DATE) || '',
        documentExpDate: formatDate(item.DOCUMENT_EXPIRY_DATE) || '',
        documentIdType: item.DOCUMENT_TYPE || '',
    })) || [];

    const Animations = () => {
        return (
            <Box sx={{ width: "100%" }}>
                <Skeleton animation="pulse" height={60} />
                <Skeleton animation="pulse" height={50} />
                <Skeleton animation="pulse" height={50} />
                <Skeleton animation="pulse" height={50} />
                <Skeleton animation="pulse" height={50} />
                <Skeleton animation="pulse" height={50} />
                <Skeleton animation="pulse" height={50} />
                <Skeleton animation="pulse" height={50} />
            </Box>
        );
    };
    // console.log(rows, "myrows")
    return (
        <>
            <Sidebar
                COMPANY_ID={COMPANY_ID}
                COMPANY_USERNAME={COMPANY_USERNAME}
                COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                active={4}
                toggle={openNav}
            />
            <Box className="box" >
                <Button
                    size="small"
                    variant={"outlined"}
                    className="btn button  bg-white"
                // className={display === "unarchive" ? "btn button  bg-white" : "btn btn-sm bg-button rounded-0 text-light"}
                // onClick={() => setDisplay("unarchive")}
                >
                    Company Documents
                </Button>
                {/* <Button
                    size="small"
                    variant={"outlined"}
                    className={display === "archive" ? "btn button  bg-white" : "btn btn-sm bg-button rounded-0 text-light"}
                    onClick={() => setDisplay("archive")}
                >
                    Archive
                </Button> */}
                <Navbar toggle={() => setOpenNav((e) => !e)} />
                {/* <DocumentCreate
                    name={"Employee"}
                    COMPANY_ID={COMPANY_ID}
                    COMPANY_USERNAME={COMPANY_USERNAME}
                    COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                    update={getalldocument}

                /> */}

                <CreateDoc
                    COMPANY_ID={COMPANY_ID}
                    COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                    COMPANY_USERNAME={COMPANY_USERNAME}
                    update={getalldocument}
                    apiEndpoint={apiEndpoint}
                />
                <MyScreen sx={{ display: "block", padding: 2 }}>
                    <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
                        {isLoading === true ?
                            <Animations /> : isLoading === false ?
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    sx={{ border: "none", height: '80vh' }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 14,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[10]}
                                    disableMultipleSelection
                                    density="compact"

                                    getRowId={(row) => row.id}
                                />
                                : isLoading === "error" ? <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                    }}
                                >
                                    <small className="text-dark"><p>Check your connection and try again. :(</p><center><button onClick={getalldocument} className="btn btn-sm btn-secondary">Retry</button></center></small>
                                </div> : <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                    }}
                                >
                                    <RotatingLines
                                        strokeColor="#2D5169"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={true}
                                    />
                                </div>}

                    </Box>
                </MyScreen>
            </Box>
            <SimpleBackdrop open={backdrop} />

        </>
    );
}