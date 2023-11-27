import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Modal } from "@mui/material";
import { toast } from "react-toastify";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EmployeeManual = ({ EMPLOYEE_DATA }) => {

  const [project, setProject] = useState();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };









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
      p: 2,
      zIndex: "999999 !important",
      borderRadius: 2,
    };

    // user input
    const handleTimeChange = (event) => {
      const newTime = event.target.value;
      setSelectedTimeIn(newTime);
    };




    // fatch project report
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)


    const fetchProjectReport = async () => {
      let datas = {
        "projectId": data?.PROJECT_ID,
        "employeeId": EMPLOYEE_DATA?.EMPLOYEE_ID,
        "EMPLOYEE_MEMBER_PARENT_USERNAME": EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_USERNAME,
        "PUNCH_TYPE": "PunchIn"
      };

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: '/api/getprojectreport',
        data: datas
      };

      axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          setUser(response.data.result)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });

    }

    useEffect(() => {
      fetchProjectReport()
    }, []);





    // const times 
    const inputTime = user?.TIME

    console.log(inputTime,"report time")
    let dateTime = new Date(inputTime);
    // Format components with leading zeros
    let year = dateTime.getUTCFullYear();
    let month = String(dateTime.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    let day = String(dateTime.getUTCDate()).padStart(2, '0');
    let hours = String(dateTime.getUTCHours()).padStart(2, '0');
    let minutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
    let seconds = String(dateTime.getUTCSeconds()).padStart(2, '0');
    let milliseconds = dateTime.getUTCMilliseconds();

    console.log(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`)


    // post attendence
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedTimeIn, setSelectedTimeIn] = useState("");

    useEffect(() => {
      setSelectedTimeIn(`${hours}:${minutes}`)
    }, [hours])

    console.log(`${year}-${month}-${day}T${selectedTimeIn?.split(':')[0]}:${selectedTimeIn?.split(':')[0]}:${seconds}.${milliseconds}Z`, "selectedTime in")

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
          ATTENDANCE_DATE_ID: user?.DATE,
          ATTENDANCE_IN: user?.TIME,
          ATTENDANCE_PROJECT_ID: data?.PROJECT_ID
        };

        // setShowBackdrop(true);

        axios
          .post(
            "/api/create_emp_attendence",
            attendanceData,

          )
          .then(() => {
            toast.success("PunchIn Submitted successfully!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1000,

            });
            handleClose()
            console.log("sucess")
          })
          .catch((error) => {
          });
      } else {
      }
    };








    return (
      <div>
        {user?.TIME ? <> <button
          className="primary btn btn-danger btn-sm rounded-2 text-white"
          style={{ padding: "4px 10px" }}
          onClick={handleOpen}
        >
          <i class="fa fa-address-card"></i> request
        </button></> : <button
          disabled
          className="primary btn btn-success btn-sm rounded-2"
          style={{ padding: "4px 10px" }}
        >
          {loading ? "Loading..." : "No request"}
        </button>}
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
                  <div>Date : {user?.DATE}</div>
                  <div>TIME : {`${year}-${month}-${day}T${selectedTimeIn?.split(':')[0]}:${selectedTimeIn?.split(':')[1]}:${seconds}.${milliseconds}Z`}</div>
                  {selectedTimeIn}

                  <div className="col-4  text-center ">
                    <input
                      type="time"
                      id="timeInput"
                      name="timeInput"
                      value={selectedTimeIn}
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
      p: 2,
      zIndex: "999999 !important",
      borderRadius: 2,
    };

    // user input
    const handleTimeChange = (event) => {
      const newTime = event.target.value;
      setSelectedTimeIn(newTime);
    };




    // fatch project report
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)


    const fetchProjectReport = async () => {
      let datas = {
        "projectId": data?.PROJECT_ID,
        "employeeId": EMPLOYEE_DATA?.EMPLOYEE_ID,
        "EMPLOYEE_MEMBER_PARENT_USERNAME": EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_USERNAME,
        "PUNCH_TYPE": "PunchOut"
      };

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: '/api/getprojectreport',
        data: datas
      };

      axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          setUser(response.data.result)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });

    }

    useEffect(() => {
      fetchProjectReport()
    }, []);





    // const times 
    const inputTime = user?.TIME
    let dateTime = new Date(inputTime);
    // Format components with leading zeros
    let year = dateTime.getUTCFullYear();
    let month = String(dateTime.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    let day = String(dateTime.getUTCDate()).padStart(2, '0');
    let hours = String(dateTime.getUTCHours()).padStart(2, '0');
    let minutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
    let seconds = String(dateTime.getUTCSeconds()).padStart(2, '0');
    let milliseconds = dateTime.getUTCMilliseconds();

    console.log(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`)


    // post attendence
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedTimeIn, setSelectedTimeIn] = useState("");

    useEffect(() => {
      setSelectedTimeIn(`${hours}:${minutes}`)
    }, [hours])

    console.log(`${year}-${month}-${day}T${selectedTimeIn?.split(':')[0]}:${selectedTimeIn?.split(':')[0]}:${seconds}.${milliseconds}Z`, "selectedTime in")

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
          ATTENDANCE_DATE_ID: user?.DATE,
          ATTENDANCE_OUT: user?.TIME,
          ATTENDANCE_PROJECT_ID: data?.PROJECT_ID
        };

        // setShowBackdrop(true);

        axios
          .post(
            "/api/create_emp_attendence",
            attendanceData,

          )
          .then(() => {
            toast.success("PunchIn Submitted successfully!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1000,

            });
            handleClose()
            console.log("sucess")
          })
          .catch((error) => {
          });
      } else {
      }
    };








    return (
      <div>

        {user?.TIME ? <> <button
          className="primary btn btn-danger btn-sm rounded-2 text-white"
          style={{ padding: "4px 10px" }}
          onClick={handleOpen}
        >
          <i class="fa fa-address-card"></i> request
        </button></> : <button
          disabled
          className="primary btn btn-success btn-sm rounded-2"
          style={{ padding: "4px 10px" }}
        >
          {loading ? "Loading..." : "No request"}
        </button>}
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
                  <div>Date : {user?.DATE}</div>
                  <div>Date : {user?.TIME}</div>
                  <div>TIME : {`${year}-${month}-${day}T${selectedTimeIn?.split(':')[0]}:${selectedTimeIn?.split(':')[1]}:${seconds}.${milliseconds}Z`}</div>
                  {selectedTimeIn}

                  <div className="col-4  text-center ">
                    <input
                      type="time"
                      id="timeInput"
                      name="timeInput"
                      value={selectedTimeIn}
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

        <div className="container" style={{ paddingRight: "3%" }}>
          <div className="row pb-2 border-bottom">
            <div className="col">
              <strong>S. No.</strong>
            </div>
            <div className="col">
              <strong>Project Id</strong>
            </div>
            <div className="col">
              <strong>Project Name</strong>
            </div>
            <div className="col">
              <strong>Name</strong>
            </div>
            <div className="col">
              <strong>Employee Id</strong>
            </div>
          </div>
        </div>
        {project?.map((post, index) => <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
            sx={{ height: "40px" }}
          >
            <div className="container g-0">
              <div className="row">
                <div className="col">
                  <strong>{index+1}</strong>
                </div>
                <div className="col">
                  <strong>{post.PROJECT_ID}</strong>
                </div>
                <div className="col">
                  <strong>{post.PROJECT_NAME}</strong>
                </div>
                <div className="col">
                  <strong>{EMPLOYEE_DATA?.EMPLOYEE_NAME}</strong>
                </div>
                <div className="col">
                  <strong>{EMPLOYEE_DATA?.EMPLOYEE_ID}</strong>
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="container">
              <div className="row pb-2 border-bottom  pb-2 border-bottom bg-primary">
                <div className="col">
                  <strong>S. No.</strong>
                </div>
                <div className="col">
                  <strong>Punch In</strong>
                </div>
                <div className="col">
                  <strong>PunchOut</strong>
                </div>
                <div className="col">
                  <strong>Date</strong>
                </div>
              </div>
            </div>
            {expanded === `panel${index}` && 
            <div className="container pt-2">
              <div className="row">
                <div className="col">
                  <strong>{index}</strong>
                </div>
                <div className="col">
                  <Typography>
                    <PUNCHIN data={post} />
                  </Typography>
                </div>
                <div className="col">
                  <Typography>
                    <PUNCHOUT data={post} />
                  </Typography>
                </div>
                <div className="col">
                  <strong>Date</strong>
                </div>
              </div>
            </div>
            }

          </AccordionDetails>
        </Accordion>)}
      </>

    </Box>
  );
};

export default EmployeeManual;
