import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Modal } from "@mui/material";

const EmployeeManual = ({ EMPLOYEE_DATA }) => {

  const [project, setProject] = useState();


  //get all project
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = EMPLOYEE_DATA.EMPLOYEE_ASSIGN.map((item) => {
          const {
            PROJECT_ID,
            PROJECT_PARENT_ID,
            PROJECT_MEMBER_PARENT_ID,
            PROJECT_MEMBER_PARENT_USERNAME,
            PROJECT_USERNAME,
          } = item;

          const data = {
            PROJECT_ID,
            PROJECT_PARENT_ID,
            PROJECT_MEMBER_PARENT_ID,
            PROJECT_MEMBER_PARENT_USERNAME,
            PROJECT_USERNAME,
          };

          return axios.put(
            "/api/get_projects_one",
            data,

          );
        });

        const responses = await Promise.all(requests);
        console.log(responses, "responses")
        const arry = responses.map((response) => response.data.result[0]);
        if (arry) {
          setProject(arry);
          console.log(arry, "arry")
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [EMPLOYEE_DATA]);



  console.log(project, "project")

  // current date time 
  //  const currentTime = new Date().toLocaleTimeString();
  //  const currentDate = new Date().toLocaleDateString();

  const MyDate = new Date();
  console.log(MyDate, "Mydate");

  const currentDates = new Date();
  currentDates.setDate(currentDates.getDate());
  const year = currentDates.getFullYear();
  const month = String(currentDates.getMonth() + 1).padStart(2, "0");
  const day = String(currentDates.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;




  // attendance in






  // // attendance out

  // const handleSubmitOut = (event) => {
  //   event.preventDefault();
  //   if (isInsideCircle) {
  //     const attendanceData = {
  //       ATTENDANCE_ADMIN_ID: event?.EMPLOYEE_MEMBER_PARENT_ID,
  //       ATTENDANCE_ADMIN_USERNAME:
  //       event?.EMPLOYEE_MEMBER_PARENT_USERNAME,
  //       ATTENDANCE_COMPANY_ID: event?.EMPLOYEE_PARENT_ID,
  //       ATTENDANCE_COMPANY_USERNAME: event?.EMPLOYEE_PARENT_USERNAME,
  //       ATTENDANCE_EMPLOYEE_ID: event?.EMPLOYEE_ID,
  //       ATTENDANCE_EMPLOYEE_USERNAME: event?.EMPLOYEE_USERNAME,
  //       ATTENDANCE_DATE_ID: formattedDate,
  //       ATTENDANCE_OUT: new Date(),
  //       ATTENDANCE_PROJECT_ID: Project_Id
  //     };

  //     setShowBackdrop(true);

  //     axios
  //       .post(
  //         "/api/create_emp_attendence",
  //         attendanceData,

  //       )
  //       .then(() => {
  //         setOutdone(true);
  //         setShowBackdrop(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setShowBackdrop(false);
  //       });
  //   } else {
  //     setLocError("You are outside the project location");
  //   }
  // };




  // all rows
  const rows = project ? project : [{
    "PROJECT_ID": ""
  }];


  // all columns 
  const columns = [
    { field: "PROJECT_ID", headerName: "Project Id", width: 120 },

    {
      field: "PROJECT_USERNAME",
      headerName: "Project Username",
      width: 120,
      editable: true,
    },
    {
      field: "PROJECT_NAME",
      headerName: "Project Name",
      width: 120,
      editable: true,
    }
    ,
    {
      field: "action_1",
      headerName: "Punch In",
      width: 220,
      renderCell: (cellValues) => {
        return (
          <PUNCHIN data={cellValues} />
        )
      },
    }
    ,
    {
      field: "action_2",
      headerName: "Punch Out",
      width: 220,
      renderCell: (cellValues) => {
        return (
          <PUNCHOUT data={cellValues} />
        )
      },
    }
  ];



  const PUNCHIN = ({ data }) => {

    console.log(data, "props")
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      display: 'inline',
      // border: '2px solid #000',
      // boxShadow: 24,
      p: 2,
      zIndex: "999999 !important",
      borderRadius: 2,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedTime, setSelectedTime] = useState('00:00');
    const [indone, setIndone] = useState(false);

    const handleTimeChange = (event) => {
      const newTime = event.target.value;
      setSelectedTime(newTime);
    };

    console.log(selectedTime, "selectedTime")


    // CONVERT TIME FORMET

    // Get the current date
    const currentDate = new Date();

    // Extract the time values from the input string "19:06"
    const [hours, minutes] = selectedTime?.split(':');

    // Set the time values to the current date
    currentDate?.setHours(hours);
    currentDate?.setMinutes(minutes);
    currentDate?.setSeconds(0);
    currentDate?.setMilliseconds(0);

    // Format the date in the desired format
    const formattedTime = currentDate?.toISOString();

    // console.log(formattedTime);

    const handleSubmitIn = (event) => {
      event.preventDefault();

      if (event) {
        const attendanceData = {
          ATTENDANCE_ADMIN_ID: EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_ID,
          ATTENDANCE_ADMIN_USERNAME:
            EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_USERNAME,
          ATTENDANCE_COMPANY_ID: EMPLOYEE_DATA?.EMPLOYEE_PARENT_ID,
          ATTENDANCE_COMPANY_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_PARENT_USERNAME,
          ATTENDANCE_EMPLOYEE_ID: EMPLOYEE_DATA?.EMPLOYEE_ID,
          ATTENDANCE_EMPLOYEE_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_USERNAME,
          ATTENDANCE_DATE_ID: formattedDate,
          ATTENDANCE_IN: formattedTime,
          ATTENDANCE_PROJECT_ID: data.row?.PROJECT_ID
        };

        // setShowBackdrop(true);

        axios
          .post(
            "/api/create_emp_attendence",
            attendanceData,

          )
          .then(() => {
            setIndone("sucess");
            // setShowBackdrop(false);
            handleClose()
            console.log("sucess")
          })
          .catch((error) => {
            // console.log(error);
            // setShowBackdrop(false);
          });
      } else {
        // setLocError("You are outside the project location");
      }
    };



    return (
      <div>
        {/* <Button onClick={handleOpen}>Setup Punch In</Button> */}
        <button
          variant="contained"
          className="primary btn btn-success btn-sm rounded-5"
          style={{ padding: "4px 10px" }}
          // onClick={(event) => {
          //   handleSubmitIn(cellValues);
          // }}
          onClick={handleOpen}
        >
          Setup Punch In
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h5>Setup Punch In Time</h5>
            <form className="form-row">

              <div className="container">

                <div className="row py-4">
                  <div className="col-4  text-center ">
                    <input
                      type="time"
                      id="timeInput"
                      name="timeInput"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      className="form-control form-control-2"
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div className="col-8 text-center d-flex" style={{ gap: 4 }}>
                    <button
                      variant="contained"
                      className="primary btn btn-success btn-sm rounded-5"
                      style={{ padding: "4px 10px" }}
                      onClick={(event) => {
                        handleSubmitIn(event);
                      }}
                    >
                      Punch In
                    </button>


                    <button
                      variant="contained"
                      className="primary btn btn-danger btn-sm rounded-5"
                      style={{ padding: "4px 10px" }}
                      onClick={(event) => {
                        handleClose();
                      }}
                    >
                      Cancel
                    </button>


                  </div>


                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    );

  }



  const PUNCHOUT = ({ data }) => {

    console.log(data, "props")
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      display: 'inline',
      // border: '2px solid #000',
      // boxShadow: 24,
      p: 2,
      zIndex: "999999 !important",
      borderRadius: 2,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedTime, setSelectedTime] = useState('00:00');
    const [outdone, setOutdone] = useState(false);

    const handleTimeChange = (event) => {
      const newTime = event.target.value;
      setSelectedTime(newTime);
    };


    // CONVERT TIME FORMET

    // Get the current date
    const currentDate = new Date();

    // Extract the time values from the input string "19:06"
    const [hours, minutes] = selectedTime?.split(':');

    // Set the time values to the current date
    currentDate?.setHours(hours);
    currentDate?.setMinutes(minutes);
    currentDate?.setSeconds(0);
    currentDate?.setMilliseconds(0);

    // Format the date in the desired format
    const formattedTime = currentDate.toISOString();

    console.log(selectedTime, "selectedTime")

    const handleSubmitIn = (event) => {
      event.preventDefault();

      if (event) {
        const attendanceData = {
          ATTENDANCE_ADMIN_ID: EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_ID,
          ATTENDANCE_ADMIN_USERNAME:
            EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_USERNAME,
          ATTENDANCE_COMPANY_ID: EMPLOYEE_DATA?.EMPLOYEE_PARENT_ID,
          ATTENDANCE_COMPANY_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_PARENT_USERNAME,
          ATTENDANCE_EMPLOYEE_ID: EMPLOYEE_DATA?.EMPLOYEE_ID,
          ATTENDANCE_EMPLOYEE_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_USERNAME,
          ATTENDANCE_DATE_ID: formattedDate,
          ATTENDANCE_OUT: formattedTime,
          ATTENDANCE_PROJECT_ID: data.row?.PROJECT_ID
        };

        // setShowBackdrop(true);

        axios
          .post(
            "/api/create_emp_attendence",
            attendanceData,

          )
          .then(() => {
            setOutdone("sucess");
            // setShowBackdrop(false);
            handleClose()
            console.log("sucess")
          })
          .catch((error) => {
            // console.log(error);
            // setShowBackdrop(false);
          });
      } else {
        // setLocError("You are outside the project location");
      }
    };



    return (
      <div>
        {/* <Button onClick={handleOpen}>Setup Punch Out</Button> */}
        <button
          variant="contained"
          className="primary btn btn-success btn-sm rounded-5"
          style={{ padding: "4px 10px" }}
          // onClick={(event) => {
          //   handleSubmitIn(cellValues);
          // }}
          onClick={handleOpen}
        >
          Setup Punch Out
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h5>Setup Punch Out Time</h5>
            <form className="form-row">

              <div className="container">

                <div className="row py-4">
                  <div className="col-4  text-center ">
                    <input
                      type="time"
                      id="timeInput"
                      name="timeInput"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      className="form-control form-control-2"
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div className="col-8 text-center d-flex" style={{ gap: 4 }}>
                    <button
                      variant="contained"
                      className="primary btn btn-success btn-sm rounded-5"
                      style={{ padding: "4px 10px" }}
                      onClick={(event) => {
                        handleSubmitIn(event);
                      }}
                    >
                      Punch Out
                    </button>


                    <button
                      variant="contained"
                      className="primary btn btn-danger btn-sm rounded-5"
                      style={{ padding: "4px 10px" }}
                      onClick={(event) => {
                        handleClose();
                      }}
                    >
                      Cancel
                    </button>

                    {outdone && outdone}



                  </div>


                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    );

  }






  return (
    <Box style={{ height: "100%", padding: 0, paddingBottom: "0", position: "relative" }}>

      <>
        {project?.length > 0 ? <DataGrid
          className="display"
          sx={{ border: "none" }}
          rows={rows}
          columns={columns}
          getRowId={(row, index) => row.PROJECT_ID}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          density="compact"
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
        /> : project?.length === 0 ? "Sorry!, No project assgin to this employee for attendance" : "Loading..."}
      </>

    </Box>
  );
};

export default EmployeeManual;
