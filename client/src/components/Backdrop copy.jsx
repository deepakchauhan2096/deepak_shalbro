import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";





function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}


export default function SimpleBackdrop({ open }) {
  return (
    <div>
      <Backdrop
        sx={{
          backgroundColor: "#f0f0f0",
          color: "#00008B",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position:"absolute",
          top:"0",
          left:"0"
        }}
        open={open}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          < CircularProgressWithLabel style={{ marginBottom: "16px" }} color="inherit" />
          <h2 style={{ fontSize: "1.2rem" }}>Please wait...</h2>
        </div>
      </Backdrop>
    </div>
  );
}
