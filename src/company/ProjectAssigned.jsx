import React from "react";

const ProjectAssigned = (props) => {
  const filterData = props.projectData;
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
                        {key+1}
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
