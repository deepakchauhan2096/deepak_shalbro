import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link , useNavigate} from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "63vh",
};

const center = {
  lat: -33.8569,
  lng: 151.2152,
};

window.google = window.google || {};

const EmployeeDetail = ({ state }) => {
  const navigate = useNavigate();
  const [circleCenter, setCircleCenter] = useState([0, 0]);
  const [circleRadius, setCircleRadius] = useState(100);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [map, setMap] = useState(null);
  const [project, setProject] = useState();
  const [filterProject, setFilterproject] = useState("");
  console.log(state, "userEmp");

  const PROJECTS = state.EMPLOYEE_ASSIGN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = PROJECTS.map((item) => {
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
            "http://54.243.89.186:5001/get_projects_one",
            data,
            {
              headers: {
                "Content-Type": "application/json",
                authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
              },
            }
          );
        });

        const responses = await Promise.all(requests);

        const arry = responses.map((response) => response.data.result[0]);
        setProject(arry);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    onLoad();
  }, [markerPosition]);

  const filter = (event) => {
    const myproject = project.find((e) => e.PROJECT_NAME === event);
    let Position = {
      lat: parseFloat(filterProject.LATITUDE),
      lng: parseFloat(filterProject.LONGITUDE),
    };
    let Radius = parseInt(filterProject.AREA);
    setFilterproject(myproject);
    setCircleRadius(Radius);
    setMarkerPosition(Position);
    console.log(myproject, "myproject");
  };

  
  const logout = () => {
    // Clear a cookie by specifying its name
    Cookies.remove("myResponseData");
    navigate("/employee/login");
  };

  return (
    <>
      <div className="container-fluid g-0">
        <nav
          class="navbar navbar-expand-lg navbar-dark bg-dark"
          style={{ marginBottom: 0 }}
        >
          <div className="container">
            <a class="navbar-brand" href="#">
              {state.EMPLOYEE_NAME} (Employee)
            </a>
            <button
              class="btn btn-outline-primary my-2 my-sm-0 btn-sm"
              type="submit"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>

        <nav
          class="navbar navbar-expand-lg navbar-light bg-light"
          style={{ height: "40px" }}
        >
          <div className="container">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a className="bg-white text-dark nav-link">My Projects</a>
              </div>
            </div>
          </div>
        </nav>

        {project ? (
          <div className="container">
            <div className="row">
              <div className="col-12   d-lg-none overflow-auto" />
              <h5 className="py-4 text-underline">My Projects</h5>
              <table class="table table-striped table-sm">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">S No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Project Id</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Punch</th>
                  </tr>
                </thead>

                <tbody>
                  {project?.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item?.PROJECT_NAME}</td>
                      <td>{item?.PROJECT_ID}</td>
                      <td>{item?.PROJECT_START_DATE}</td>
                      <td>{item?.PROJECT_END_DATE}</td>
                      <td>
                        <Link to={`/employee/attendance/${item?.LATITUDE}/${item?.LONGITUDE}/${item?.AREA}/${item?.LOCATION_NAME}/${state.EMPLOYEE_NAME}/${item?.PROJECT_NAME}/${item?.PROJECT_ID}`}
                          className="btn btn-sm btn-primary"
                          // to={`/employee/attendance/${item?.LATITUDE}&${item?.LONGITUDE}&${item?.AREA}&${item?.LOCATION_NAME}&${state.EMPLOYEE_NAME}&${item?.PROJECT_NAME}&${item?.PROJECT_ID}`}
                         

                        >
                          Visit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="container">loading...</div>
        )}
      </div>
    </>
  );
};

export default EmployeeDetail;
