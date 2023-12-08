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
import moment from "moment/moment";

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



    // fatch project report
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)


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
          setUser(response.data.result, "PunchIn")
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });

    }

    useEffect(() => {
      fetchProjectReport()
    }, [refresh]);




    const MYMODAL = ({ events }) => {
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const handleTimeChange = (event) => {
        const newTime = event.target.value;
        setSelectedTimeIn(newTime);
      };
      const localTime = moment(events?.TIME).utcOffset(0).format("LT")
      const convertedTime = moment(localTime, 'h:mm A').format('HH:mm')




      // post attendence

      const [selectedTimeIn, setSelectedTimeIn] = useState(convertedTime);
      const originalTime = moment(`${events?.DATE} ${selectedTimeIn}`).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

      const deleteReport = () => {

        let data = {
          PROJECT_ID: events?.PROJECT_ID,
          EMPLOYEE_ID: events?.EMPLOYEE_ID,
          EMPLOYEE_MEMBER_PARENT_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_USERNAME,
          DATE: events?.DATE
        };

        let config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: `/api/deleteproject`,
          data: data
        };

        axios.request(config)
          .then((response) => {
            setRefresh(true)
          })
          .catch((error) => {
            console.log(error);
            toast.error('Document not found!', {
            });
          });


      }



      const handleSubmitIn = async (event) => {
        event.preventDefault();

        if (event) {
          const attendanceData = {
            ATTENDANCE_ADMIN_ID: EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_ID,
            ATTENDANCE_ADMIN_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_USERNAME,
            ATTENDANCE_COMPANY_ID: EMPLOYEE_DATA?.EMPLOYEE_PARENT_ID,
            ATTENDANCE_COMPANY_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_PARENT_USERNAME,
            ATTENDANCE_EMPLOYEE_ID: EMPLOYEE_DATA?.EMPLOYEE_ID,
            ATTENDANCE_EMPLOYEE_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_USERNAME,
            ATTENDANCE_DATE_ID: events?.DATE,
            ATTENDANCE_IN: originalTime,
            ATTENDANCE_PROJECT_ID: events?.PROJECT_ID
          };

          try {
            // setShowBackdrop(true);

            const res = await axios.post("/api/create_emp_attendence", attendanceData);

            if (res) {
              toast.success("PunchIn Submitted successfully! 333", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
              });


              deleteReport();
              handleClose(false)
            }
          } catch (error) {
            // Handle error
          }
        } else {
          console.log("something wemt wrong")
        }
      };







      return (
        <div>
          {events?.TIME ? <> <button
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
                    <div>Date : {events?.DATE}</div>
                    {/* <div>TIME : {moment(events?.TIME).format("LT")}</div> */}
                    <div>{originalTime}</div>
                    {/* {selectedTimeIn} */}

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
      )
    }


    const fatchData = user?.map((e) => e.PUNCH_TYPE);

    return (
      <>
        {fatchData[0] === "PunchIn" ? <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">S. No.</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Punch In</th>
            </tr>
          </thead>
          <tbody>
            {
              user.map((e, index) =>
                <>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{e.DATE}</td>
                    <td>{moment(e.TIME).utcOffset(0).format('LT')}</td>
                    <td><MYMODAL events={e} /></td>
                  </tr>
                </>

              )
            }
          </tbody>
        </table> : "Currently! No Punch In Request"} 
      </>
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



    // fatch project report
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)


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
          setUser(response.data.result, "PunchIn")
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });

    }

    useEffect(() => {
      fetchProjectReport()
    }, [refresh]);




    const MYMODAL = ({ events }) => {
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const handleTimeChange = (event) => {
        const newTime = event.target.value;
        setSelectedTimeIn(newTime);
      };
      const localTime = moment(events?.TIME).utcOffset(0).format("LT")
      const convertedTime = moment(localTime, 'h:mm A').format('HH:mm')




      // post attendence

      const [selectedTimeIn, setSelectedTimeIn] = useState(convertedTime);
      const originalTime = moment(`${events?.DATE} ${selectedTimeIn}`).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

      const deleteReport = () => {

        let data = {
          PROJECT_ID: events?.PROJECT_ID,
          EMPLOYEE_ID: events?.EMPLOYEE_ID,
          EMPLOYEE_MEMBER_PARENT_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_USERNAME,
          DATE: events?.DATE
        };

        let config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: `/api/deleteproject`,
          data: data
        };

        axios.request(config)
          .then((response) => {
            setRefresh(true)
          })
          .catch((error) => {
            console.log(error);
            toast.error('Document not found!', {
            });
          });


      }



      const handleSubmitIn = async (event) => {
        event.preventDefault();

        if (event) {
          const attendanceData = {
            ATTENDANCE_ADMIN_ID: EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_ID,
            ATTENDANCE_ADMIN_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_MEMBER_PARENT_USERNAME,
            ATTENDANCE_COMPANY_ID: EMPLOYEE_DATA?.EMPLOYEE_PARENT_ID,
            ATTENDANCE_COMPANY_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_PARENT_USERNAME,
            ATTENDANCE_EMPLOYEE_ID: EMPLOYEE_DATA?.EMPLOYEE_ID,
            ATTENDANCE_EMPLOYEE_USERNAME: EMPLOYEE_DATA?.EMPLOYEE_USERNAME,
            ATTENDANCE_DATE_ID: events?.DATE,
            ATTENDANCE_OUT: originalTime,
            ATTENDANCE_PROJECT_ID: events?.PROJECT_ID
          };

          try {
            // setShowBackdrop(true);

            const res = await axios.post("/api/create_emp_attendence", attendanceData);

            if (res) {
              toast.success("PunchIn Submitted successfully! 333", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
              });


              deleteReport();
              handleClose(false)
            }
          } catch (error) {
            // Handle error
          }
        } else {
          console.log("something wemt wrong")
        }
      };







      return (
        <div>
          {events?.TIME ? <> <button
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
                    <div>Date : {events?.DATE}</div>
                    {/* <div>TIME : {moment(events?.TIME).format("LT")}</div> */}
                    <div>{originalTime}</div>
                    {/* {selectedTimeIn} */}

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
      )
    }


    const fatchData = user?.map((e) => e.PUNCH_TYPE);

    return (
      <>
        {fatchData[0] === "PunchOut" ? <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">S. No.</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Punch Out</th>
            </tr>
          </thead>
          <tbody>
            {
              user.map((e, index) =>
                <>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{e.DATE}</td>
                    <td>{moment(e.TIME).utcOffset(0).format('LT')}</td>
                    <td><MYMODAL events={e} /></td>
                  </tr>
                </>

              )
            }
          </tbody>
        </table> : "Currently! No Punch Out Request"}
      </>
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
            sx={{background: expanded === `panel${index}` ? "#696969" : ""}}

          >
            <div className="container g-0">
              <div className={expanded === `panel${index}` ? "row text-white" : "row"}>
                <div className="col">
                  <strong>{index + 1}</strong>
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

            {expanded === `panel${index}` &&

              <div className="containet">
                <div className="row">
                  <div className="col-6">
                    <>
                      <Typography key={index}>
                        <PUNCHIN data={post} ke />
                      </Typography>
                    </>
                  </div>
                  <div className="col-6">
                  <>
                      <Typography key={index}>
                        <PUNCHOUT data={post} ke />
                      </Typography>
                    </>
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
