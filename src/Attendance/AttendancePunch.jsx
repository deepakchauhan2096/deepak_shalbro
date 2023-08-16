import React, { useEffect, useState } from "react";
import moment from "moment/moment";
const AttendancePunch = (props) => {

  console.log(props,"props-data")
  return (
    <>
      <thead
        style={{
          position: "sticky",
          top: "85px",
        }}
      >
        <tr className="table-light">
          <th scope="col">Employee</th>
          <th scope="col">Date</th>
          <th scope="col">In</th>
          <th scope="col">Out</th>
          <th scope="col">PTO</th>
          <th scope="col">Acknowledge</th>
        </tr>
      </thead>
      <tbody>
        {props.data.AttendanceData.map((post) => (
          <tr className="table table-striped">
            <td>{props.data._doc.EMPLOYEE_NAME}</td>
            <td>{post.ATTENDANCE_DATE_ID}</td>
            <td>{moment(post.ATTENDANCE_IN).format("LT")}</td>
            <td>{moment(post.ATTENDANCE_OUT).format("LT")}</td>
            <td>{post.TOTAL_HOURS}</td>
            <td>{post.LOCATION}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default AttendancePunch;
