import React, { useState } from 'react';
import datas from "./dummy.json"

const Temp = ({ data }) => {


  // const data = [
  //   // ... The original array you provided ...
  // ];
  
  const processedData = datas.map((employee) => {
    const totalHours = employee.EMPLOYEE_ATTENDANCE.reduce((acc, attendance) => {
      const attendanceIn = new Date(attendance.ATTENDANCE_IN);
      const attendanceOut = new Date(attendance.ATTENDANCE_OUT);
      const hoursWorked = (attendanceOut - attendanceIn) / (1000 * 60 * 60); // Convert milliseconds to hours
      return acc + hoursWorked;
    }, 0);
  
    const modifiedEmployee = {
      ...employee,
      "TOTALHOURS": totalHours.toFixed(2),
      EMPLOYEE_ATTENDANCE: employee.EMPLOYEE_ATTENDANCE.map((attendance) => {
        const attendanceIn = new Date(attendance.ATTENDANCE_IN);
        const attendanceOut = new Date(attendance.ATTENDANCE_OUT);
        const hoursWorked = (attendanceOut - attendanceIn) / (1000 * 60 * 60); // Convert milliseconds to hours
  
        return {
          ...attendance,
          HOURS: hoursWorked.toFixed(2),
          REGULAR: hoursWorked.toFixed(2), // Assuming "REGULAR" represents the regular hours worked
        };
      }),
    };
  
    return modifiedEmployee;
  });
  
  console.log(processedData);
  

  const [filters, setFilters] = useState({
    name: '',
    fromDate: '',
    toDate: '',
    employmentType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = (employeeData, filters) => {
    return employeeData.filter((employee) => {
      const nameMatch = employee.EMPLOYEE_NAME.toLowerCase().includes(filters.name.toLowerCase());
      const fromDateMatch = !filters.fromDate || employee.EMPLOYEE_ATTENDANCE.some(
        (attendance) => attendance.ATTENDANCE_DATE_ID >= filters.fromDate
      );
      const toDateMatch = !filters.toDate || employee.EMPLOYEE_ATTENDANCE.some(
        (attendance) => attendance.ATTENDANCE_DATE_ID <= filters.toDate
      );
      const employmentTypeMatch = !filters.employmentType || employee.EMPLOYEE_EMPLMNTTYPE.toLowerCase().includes(filters.employmentType.toLowerCase());

      return nameMatch && fromDateMatch && toDateMatch && employmentTypeMatch;
    });
  };

  const filteredData = applyFilters(processedData, filters);

  return (
    <div>
      <h1>Employee List</h1>
      <div>
        <label>
          Employee Name:
          <input type="text" name="name" value={filters.name} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label>
          From Date:
          <input type="date" name="fromDate" value={filters.fromDate} onChange={handleInputChange} />
        </label>
        <label>
          To Date:
          <input type="date" name="toDate" value={filters.toDate} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label>
          Employment Type:
          <input
            type="text"
            name="employmentType"
            value={filters.employmentType}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.EMPLOYEE_NAME}</td>
              <td>{employee.EMPLOYEE_ROLE}</td>
              <td>{employee.TOTALHOURS}</td>
              {/* Add other table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Temp;
