import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@mui/material';

const EmployeeArchive = () => {
  const [archive, setArchive] = useState([{}]);
  const { COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME } = useParams();

  console.log('my all archive data', COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME);

  const fetchArchivedEmp = async () => {

    try {
      const response = await axios.get('/api/getall-archived-employees', {

          "EMPLOYEE_PARENT_ID": COMPANY_ID,
          "EMPLOYEE_PARENT_USERNAME": COMPANY_USERNAME,
          "EMPLOYEE_MEMBER_PARENT_ID": COMPANY_PARENT_ID,
          "EMPLOYEE_MEMBER_PARENT_USERNAME": COMPANY_PARENT_USERNAME,

      });

      const data = response.data;
      setArchive(data?.result);
      // console.log("Projects Data: =>", data);
      return data;
    } catch (err) {
      console.log('Something Went Wrong: =>', err);
      throw err;
    }

  }

  useEffect(() => {
    fetchArchivedEmp();
  }, []);

  return (
    <>
      <button
        sx={{ color: '#277099' }}
        className="btn btn-sm btn-primary rounded-0 border-0  rounded-0 text-light"
        variant="contained"
        size="small"
      >
        Archived Employee
      </button>

     
    </>
  );
};

export default EmployeeArchive;
