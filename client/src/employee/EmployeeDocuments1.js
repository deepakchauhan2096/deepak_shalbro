import { Box, Button, Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { DataGrid } from '@mui/x-data-grid';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};




const EmployeeDocuments = ({ COMPANY_USERNAME, EMPLOYEE_ID }) => {

    const [empDoc, setEmpDoc] = useState({

        "DOCUMENT_PARENT_USERNAME": COMPANY_USERNAME,
        "DOCUMENT_REF_ID": EMPLOYEE_ID

    })
    useEffect(() => {
        getEmployeeDocuments();
    },[])
    

    const getEmployeeDocuments = async () => {
        try {
            const response = await axios.put("/api/get_all_employee_document", empDoc);
            const data = response.data;
            console.log(empDoc, "empDoc")
            setEmpDoc(data)
        } catch (error) {
            console.log("Error Fetching Data :", error);
        }
    };


    const columns = [
        { field: 'sr', headerName: 'S No.', width: 60 },
        {
            field: 'documentName',
            headerName: 'Document Name',
            width: 140,
            // renderCell: renderDocumentNameCell,
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
            type: 'number',
            width: 120,
            editable: false,
        },

        {
            field: 'ExpiryDate',
            headerName: 'Expiry Status',
            description: 'Document Expiry',
            sortable: false,
            width: 140,
            editable: false,
            // renderCell: (cellValues) => {
            //   return  (<ExpiryReminder data={cellValues?.value} />)
            // },
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
                    // onClick={(e) => {
                    //     handleDownload(cellValues.id, cellValues.row.documentName);
                    // }}
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
                    // onClick={(e) => {
                    //     handleDelDoc(e, cellValues.id);
                    // }}
                    >
                        Delete
                    </Button>
                );
            },
        },

    ];



    return (
        <>

            <DataGrid
                rows={empDoc}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                density='compact'
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{ height: '80vh' }}
                getRowId={(row)=> row.DOCUMENT_ID}
            />

        </>
    )
}

export default EmployeeDocuments