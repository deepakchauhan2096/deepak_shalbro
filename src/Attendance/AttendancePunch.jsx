import React, { useEffect, useState } from "react";
import moment from "moment/moment";
const AttendancePunch = (props) => {

return (
                        <tbody>
                            {props.data.EMPLOYEE_ATTENDANCE.map(post => (
                                    <tr className="table table-striped">
                                        <td>{props.data.EMPLOYEE_NAME}</td>
                                        <td>{post.ATTENDANCE_DATE_ID}</td>
                                        <td>{moment(post.ATTENDANCE_IN).format("LT")}</td>
                                        <td>{moment(post.ATTENDANCE_OUT).format("LT")}</td>
                                        <td>{post.TOTAL_HOURS}</td>
                                        <td>-</td>
                                        <td>{post.LOCATION}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
    );
};

export default AttendancePunch;
