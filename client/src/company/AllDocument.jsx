import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import env from "react-dotenv";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Skeleton,
  // Typography,
  Box,
} from "@mui/material";
import axios from "axios";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
// const headers = {
//   "Content-Type": "application/json",
//   authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
// };

const AllDocument = () => {

  const handleSubmit = async (e) => {
 

    const response = await axios
      .put("/api/get_all_document",
       {
        "DOCUMENT_REF_ID": 12,
        "DOCUMENT_ADMIN_USERNAME": "deepanshu1"
    })
      .then((response) => {
        // console.log("response data:", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };



  return (
    <>
<button onClick={handleSubmit}>Get Document</button>
  
    </>
  );
};

export default AllDocument;
