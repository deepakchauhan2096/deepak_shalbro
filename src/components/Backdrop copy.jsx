import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop({ open }) {
  return (
    <div>
      <Backdrop
        sx={{
          backgroundColor: "#277099",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CircularProgress style={{ marginBottom: "16px" }} color="inherit" />
          <h2 style={{ fontSize: "1.2rem" }}>Please wait...</h2>
        </div>
      </Backdrop>
    </div>
  );
}
