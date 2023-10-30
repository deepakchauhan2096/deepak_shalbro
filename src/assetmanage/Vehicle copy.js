import React, { useState, useEffect, useContext } from "react";

import Box from '@mui/material/Box';
import VehicleForm from '../assetmanage/VehicleForm';
import styled from 'styled-components';
import { Button, Paper, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DataGrid } from '@mui/x-data-grid';
import './vehicle.css';


const Vehicle = () => {
  const [open, setOpen] = React.useState(false);

  const [index, setIndex] = useState(1);

  const MyScreen = styled(Paper)((props) => ({
    height: 'calc(100vh - 32px)',
    padding: 0,
    paddingBottom: '0',
    overflow: 'auto',
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? 'block' : 'none',
  }));


  // for tracking sysytem 
  const [trackingOpen, setTrackingOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleTrackingOpen = () => {
    setTrackingOpen(true);
  };

  const handleTrackingClose = () => {
    setTrackingOpen(false);
  };

  const TrackingScreen = styled(Paper)((props) => ({
    height: 'calc(100vh - 32px)',
    padding: 0,
    paddingBottom: '0',
    overflow: 'auto',
    borderRadius: 0,
    Border: 0,
    display: props.open ? 'block' : 'none',
  }));

  const StyledButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: #0056b3;
  }
`;
  // 
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'vehicleName',
      headerName: 'Vehicle Name',
      width: 150,
      editable: true,
    },
    {
      field: 'vehicleNumber',
      headerName: 'Vehicle Number',
      width: 150,
      editable: true,
    },
    {
      field: 'licenseFile',
      headerName: 'License File',
      width: 150,
      renderCell: (params) => (
        <StyledButton
          onClick={() => handleDownload(params.row.licenseFile)}
        >
          Download License
        </StyledButton>
      ),
    },
    {
      field: 'pollutionFile',
      headerName: 'Pollution File',
      width: 150,
      renderCell: (params) => (
        <StyledButton
          onClick={() => handleDownload(params.row.pollutionFile)}
        >
          Download Pollution
        </StyledButton>
      ),
    },
  ];

  const rows = [
    // Replace the placeholder data with actual data
    { id: 1, vehicleName: 'Vehicle 1', vehicleNumber: '123', licenseFile: 'license.pdf', pollutionFile: 'pollution.pdf' },
    { id: 2, vehicleName: 'Vehicle 2', vehicleNumber: '456', licenseFile: 'license.pdf', pollutionFile: 'pollution.pdf' },
    { id: 2, vehicleName: 'Vehicle 2', vehicleNumber: '456', licenseFile: 'license.pdf', pollutionFile: 'pollution.pdf' },
    { id: 2, vehicleName: 'Vehicle 2', vehicleNumber: '456', licenseFile: 'license.pdf', pollutionFile: 'pollution.pdf' },
    { id: 2, vehicleName: 'Vehicle 2', vehicleNumber: '456', licenseFile: 'license.pdf', pollutionFile: 'pollution.pdf' },
    { id: 2, vehicleName: 'Vehicle 2', vehicleNumber: '456', licenseFile: 'license.pdf', pollutionFile: 'pollution.pdf' },
    // Add more rows
  ];

  const handleDownload = (filename) => {
    // Implement your download logic here using the filename
    // For example, trigger a download from a specific URL
    window.open(`http://example.com/downloads/${filename}`, '_blank');
  };

  return (
    <>
      <Box className="box" style={{ background: '#f0f0f0' }}>
        <Button size="small" className="btn button border-bottom-0 bg-white" variant="outlined">
          Vehicle
        </Button>
        <VehicleForm name={'Project'} />

        <Button
          onClick={handleTrackingOpen}
          sx={{ color: '#277099' }}
          className="btn rounded-0 border-0  rounded-0 text-light"
          variant="contained"
          size="small"
        >
          Track Vehicles
        </Button>

        <MyScreen sx={{ display: 'block', padding: 3 }}>
          <Box sx={{ height: 400, width: '100%' }}>

            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              density="compact"
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />


          </Box>
        </MyScreen>



      </Box>
    </>
  );
};

export default Vehicle;
