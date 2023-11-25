import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Alert, Button, Container, Stack } from "@mui/material";
import env from "react-dotenv";
import country from "../Api/countriess.json";
import employeeRole from "../jsonlist/employeeRole.json"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
    validatePhoneNumber,
    validateUsername,
    validateEmail,
    validatePassword
} from "../components/Validation";
import { auth } from "../firebase";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "450px !important",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};


export default function EmployeeReportOut({ EMPLOYEE_ID, EMPLOYEE_PARENT_ID, EMPLOYEE_PARENT_USERNAME, EMPLOYEE_MEMBER_PARENT_ID, EMPLOYEE_MEMBER_PARENT_USERNAME, PROJECT_ID, EMPLOYEE_USERNAME, EMPLOYEE_NAME, PHONE_NUMBER, TIME, DATE }) {
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [createEmployee, setCreateEmployee] = useState({
        "EMPLOYEE_ID": "",
        "EMPLOYEE_PARENT_ID": "",
        "EMPLOYEE_PARENT_USERNAME": "",
        "EMPLOYEE_MEMBER_PARENT_ID": "",
        "EMPLOYEE_MEMBER_PARENT_USERNAME": "",
        "PROJECT_ID": "",
        "EMPLOYEE_USERNAME": "",
        "EMPLOYEE_NAME": "",
        "PHONE_NUMBER": "",
        "COMMENT": "",
        "PUNCH_TYPE": "PunchOut",
        "TIME": "",
        "DATE": ""
    });






    useEffect(() => {
        setCreateEmployee((prevState) => ({ ...prevState, EMPLOYEE_ID: EMPLOYEE_ID }));
        setCreateEmployee((prevState) => ({ ...prevState, EMPLOYEE_PARENT_ID: EMPLOYEE_PARENT_ID }));
        setCreateEmployee((prevState) => ({ ...prevState, EMPLOYEE_PARENT_USERNAME: EMPLOYEE_PARENT_USERNAME }));
        setCreateEmployee((prevState) => ({ ...prevState, EMPLOYEE_MEMBER_PARENT_ID: EMPLOYEE_MEMBER_PARENT_ID }));
        setCreateEmployee((prevState) => ({ ...prevState, EMPLOYEE_MEMBER_PARENT_USERNAME: EMPLOYEE_MEMBER_PARENT_USERNAME }));
        setCreateEmployee((prevState) => ({ ...prevState, PROJECT_ID: PROJECT_ID }));
        setCreateEmployee((prevState) => ({ ...prevState, EMPLOYEE_USERNAME: EMPLOYEE_USERNAME }));
        setCreateEmployee((prevState) => ({ ...prevState, EMPLOYEE_NAME: EMPLOYEE_NAME }));
        setCreateEmployee((prevState) => ({ ...prevState, PHONE_NUMBER: PHONE_NUMBER }));
        setCreateEmployee((prevState) => ({ ...prevState, TIME: TIME }));
        setCreateEmployee((prevState) => ({ ...prevState, DATE: DATE }));

    }, [open])







    // const handleCreate = (e) => {
    //   setCreateEmployee({ ...createEmployee, [e.target.name]: e.target.value });
    // };

    const handleCreate = (e) => {
        const { name, value } = e.target;
        setCreateEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");


        if (!createEmployee.EMPLOYEE_ID) {
            setErrorMsg("Something went wrong");
            return;
        }
        // Perform API validation and request
        axios
            .post("/api/projectreport", createEmployee)
            .then((response) => {
                if (response.data.operation === "failed") {
                    console.log("failed")
                    setErrorMsg(response.data?.errorMsg)
                } else if (response.data.operation === "successfull") {
                    toast.success("Punch Out Report Send successfully!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000,

                    });
                    setOpen(false);
                }
            })
            .catch((error) => {
                console.error(error, "ERR");
            });
    };


    return (
        < >
             <span
                role="button"
                onClick={handleOpen}
            >
                Punch Out Report
            </span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <Container
                    id="content"
                    style={{ height: "100vh", position: "relative" }}
                    maxWidth="xl"
                > */}
                <Box sx={style}>
                    <form onSubmit={handleSubmit} className="overflow-auto overflow-x-hidden">
                        <h5>Send PunchOut Report</h5>
                        <div className="row py-1">
                            {/* <div className="form-group col-xl-6">
                                    <input
                                        disabled
                                        type="text"
                                        className={`form-control form-control-2 rounded-0`}
                                        value={createEmployee.EMPLOYEE_ID}
                                        onChange={handleCreate}
                                    />
                                </div> */}
                            {/* <div className="form-group col-xl-6">
                                    <input
                                        disabled
                                        type="text"
                                        className={`form-control form-control-2 rounded-0`}
                                        value={createEmployee.EMPLOYEE_PARENT_ID}
                                        onChange={handleCreate}
                                    />
                                </div> */}
                            {/* <div className="form-group col-xl-6">
                                    <input
                                        disabled
                                        type="text"
                                        className={`form-control form-control-2 rounded-0`}
                                        value={createEmployee.EMPLOYEE_PARENT_USERNAME}
                                        onChange={handleCreate}
                                    />
                                </div> */}
                            {/* <div className="form-group col-xl-6">
                                    <input
                                        disabled
                                        type="text"
                                        className={`form-control form-control-2 rounded-0`}
                                        value={createEmployee.EMPLOYEE_MEMBER_PARENT_ID}
                                        onChange={handleCreate}
                                    />
                                </div> */}
                            {/* <div className="form-group col-xl-6">
                                    <input
                                        disabled
                                        type="text"
                                        className={`form-control form-control-2 rounded-0`}
                                        value={createEmployee.EMPLOYEE_MEMBER_PARENT_USERNAME}
                                        onChange={handleCreate}
                                    />
                                </div> */}
                            {/* <div className="form-group col-xl-6">
                                    <input
                                        disabled
                                        type="text"
                                        className={`form-control form-control-2 rounded-0`}
                                        value={createEmployee.PROJECT_ID}
                                        onChange={handleCreate}
                                    />
                                </div> */}
                            {/* <div className="form-group col-xl-6">
                                    <input
                                        disabled
                                        type="text"
                                        className={`form-control form-control-2 rounded-0`}
                                        value={createEmployee.EMPLOYEE_USERNAME}
                                        onChange={handleCreate}
                                    />
                                </div> */}



                            {/* <div className="form-group col-xl-6">
                                    <input
                                        disabled
                                        type="text"
                                        className={`form-control form-control-2 rounded-0`}
                                        value={createEmployee.PHONE_NUMBER}
                                        onChange={handleCreate}
                                    />
                                </div> */}




                            <div className="form-group">
                                <input
                                    disabled
                                    type="text"
                                    className={`form-control form-control-2 rounded-0`}
                                    value={createEmployee.PUNCH_TYPE}
                                    onChange={handleCreate}
                                />
                                <input
                                    disabled
                                    type="text"
                                    className={`form-control form-control-2 rounded-0`}
                                    value={createEmployee.TIME}
                                    onChange={handleCreate}
                                />
                                <input
                                    disabled
                                    type="text"
                                    className={`form-control form-control-2 rounded-0`}
                                    value={createEmployee.DATE}
                                    onChange={handleCreate}
                                />

                                <label for="inputPassword4">Add Comment</label>
                                <textarea
                                    // disabled
                                    type="text"
                                    ceholder="Enter hire date"
                                    className={`form-control rounded-0`}
                                    value={createEmployee.COMMENT}
                                    name="COMMENT"
                                    onChange={handleCreate}
                                />

                            </div>

                            {/* <div className="form-group col-xl-6">

                                </div>

                                <div className="form-group col-xl-6">

                                </div> */}

                            {/* <div className="form-group col-xl-6">
                                    <input
                                        disabled
                                        type="text"
                                        className={`form-control form-control-2 rounded-0`}
                                        value={createEmployee.EMPLOYEE_NAME}
                                        onChange={handleCreate}
                                    />
                                </div> */}

                            {/* <div className="form-group col-xl-6">

                                </div> */}


                            <div className="py-2">

                                <button
                                    type="submit"
                                    className="btn btn-info text-white btn-sm"
                                    onClick={handleSubmit}
                                >
                                    Send Report
                                </button>{" "}
                                <button
                                    onClick={handleClose}
                                    className="btn btn-danger text-white btn-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                            {errorMsg && (
                                <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
                                    <Alert severity="error">{errorMsg}</Alert>
                                </Stack>
                            )}





                        </div>


                    </form>
                </Box>
                {/* </Container> */}
            </Modal >
        </>
    );
}
