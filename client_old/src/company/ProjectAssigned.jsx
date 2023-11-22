import React from "react";
import axios from "axios";

const ProjectAssigned = (props) => {

  const filterData = props.projectData;
  console.log("Hello employee", filterData)

  // const fetchAllEmployee = async () => {
  //   try {
  //     const response = await axios.put(
  //       "/get_employee",
  //       {
  //         EMPLOYEE_MEMBER_PARENT_ID: filterallprojectData?.COMPANY_PARENT_ID,
  //         EMPLOYEE_MEMBER_PARENT_USERNAME:
  //           filterallprojectData?.COMPANY_PARENT_USERNAME,
  //         EMPLOYEE_PARENT_USERNAME: filterallprojectData?.COMPANY_USERNAME,
  //         EMPLOYEE_PARENT_ID: filterallprojectData?.COMPANY_ID,
  //       },
  //       { headers }
  //     );
  //     setTimeout(() => {
  //       // console.log("ALL EMPLOYEE data ", response);
  //       const data = response.data;
  //       setAllempData(data.result);
  //       // setIsLoading(false);
  //       console.log("please", data)
  //     }, 1000);
  //   } catch (err) {
  //     console.log("something Went wrong: =>", err);
  //   }
  // };

  return (
    <div className="container-fluid g-0">
      <div className="row">
        <div className="col-12">
          {/* <b>Assigned Employees to this project</b> */}
          <table className="table table-fixed table-sm">
            <thead>
              <tr >
                <td>
                  <b>S. No.</b>
                </td>
                <td>
                  <b>Employee ID</b>
                </td>
                <td>
                  <b>Company Username</b>
                </td>
                <td>
                  <b>Admin Username</b>
                </td>
                <td>
                  <b>Company ID</b>
                </td>
                <td>
                  <b>Admin ID</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {filterData.PROJECT_ASSIGN?.map((assignproject, key) => (
                <>
                  <tr key={key}>
                    <td>
                      {key + 1}
                    </td>
                    <td>
                      <span>{assignproject.EMPLOYEE_ID}</span>
                    </td>
                    <td>
                      <span>{assignproject.EMPLOYEE_PARENT_USERNAME}</span>
                    </td>
                    <td>
                      <span>
                        {assignproject.EMPLOYEE_MEMBER_PARENT_USERNAME}
                      </span>
                    </td>
                    <td>
                      <span>{assignproject.EMPLOYEE_PARENT_ID}</span>
                    </td>
                    <td>
                      <span>{assignproject.EMPLOYEE_MEMBER_PARENT_ID}</span>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectAssigned;