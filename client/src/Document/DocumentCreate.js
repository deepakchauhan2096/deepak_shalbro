import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const DocumentCreate = ({COMPANY_ID,COMPANY_PARENT_USERNAME,update}) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        selectedFile: null,
        DOCUMENT_EXPIRY_DATE: "",
    });
    console.log("formData", formData);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedFileName, setSelectedFileName] = useState("");
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setFormData({
            selectedFile: null,
            DOCUMENT_EXPIRY_DATE: "",
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData({
            ...formData,
            selectedFile,
        });
        setSelectedFileName(selectedFile ? selectedFile.name : ""); // Set the selected file name
    };
    // const handleFileChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         selectedFile: e.target.files[0],
    //     });
    // };

    const handleExpiryDateChange = (e) => {
        setFormData({
            ...formData,
            DOCUMENT_EXPIRY_DATE: e.target.value,
        });
    };
    console.log("formdata :".formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return; // Prevent multiple submissions
        }

        setIsSubmitting(true);

        if (!formData.selectedFile || !formData.DOCUMENT_EXPIRY_DATE) {
            setIsSubmitting(false);
            toast.error("Please select a file and enter an expiry date.");
            return;
        }

        const data = new FormData();
        console.log(data,"data")
        data.append("file", formData.selectedFile);
        data.append("DOCUMENT_REF_ID", COMPANY_ID);
        data.append("DOCUMENT_ADMIN_USERNAME", COMPANY_PARENT_USERNAME);
        data.append("DOCUMENT_EXPIRY_DATE", formData.DOCUMENT_EXPIRY_DATE);

        try {
            const response = await axios.post(
                "/api/create_document",
                data,
            );

            if (response.status === 200) {
                console.log("response", response)
                setOpen(false);
                update();
                toast.success("Document uploaded successfully.");
                setSelectedFileName("")
                setFormData("")
            } else {
                toast.error("Failed to upload document.");
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            toast.error("An error occurred while uploading the document.");
        } finally {
            setIsSubmitting(false);
        }
    };
  

    return (
        <>
            <Button
                onClick={handleOpen}
                sx={{ color: "#277099" }}
                className="btn rounded-0 border-0 rounded-0 text-light"
                variant="contained"
                size="small"
            >
                + Add New Document
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modalWidth"
            >
                <Container
                    id="content"
                    style={{ height: "100vh", position: "relative" }}
                    maxWidth="xl"
                >
                    
                    <Box sx={style}>
                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-group col-xl-12">
                                        <label className="fs-6 pb-2">Choose file to Upload</label>
                                        <input
                                            type="file"
                                            label="Image"
                                            name="myFile"
                                            className="form-control form-control-2 rounded-0"
                                            accept=".jpeg, .png, .jpg, .pdf"
                                            onChange={handleFileChange}
                                            style={{ display: "none" }}
                                        />
                                        {selectedFileName && <p className="text-success fs-7 fz-2">Selected File: {selectedFileName}</p>}
                                    </div>
                                </div>
                                <Button
                                    variant="outlined"
                                    sx={{ width: "100%" }}
                                    onClick={() =>
                                        document.querySelector('input[type="file"]').click()
                                    }
                                >
                                    Choose document&nbsp;
                                    <AddIcon fontSize="small" />
                                </Button>
                                <div className="row mb-2">
                                    <div className="form-group col-xl-12">
                                        <label className="pb-2 fs-6 rounded p-2">
                                            Select Expiry Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control mb-2 pb-2 pt-2 form-control-2 rounded-0"
                                            id="DOCUMENT_EXPIRY_DATE"
                                            name=" DOCUMENT_EXPIRY_DATE"
                                            onChange={handleExpiryDateChange}
                                            value={formData.DOCUMENT_EXPIRY_DATE}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-8">
                                        <button
                                            type="submit"
                                            className="btn btn-info text-white"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Uploading..." : "Upload document"}
                                            <ArrowCircleUpIcon fontSize="small" className="ml-2" />
                                        </button>{" "}
                                    </div>
                                    <div className="form-group col-4">
                                        <button
                                            onClick={handleClose}
                                            className="btn btn-danger text-white pl-2 pr-2"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Box>
                    <ToastContainer position="top-center" autoClose={1000} />
                </Container>
            </Modal>
        </>
    );
};

export default DocumentCreate;
