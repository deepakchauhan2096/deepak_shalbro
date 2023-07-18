import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Box, Button } from "@mui/material";

export default function ProjectUpload(props) {
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const [imagesData, setImagesData] = useState([]);

  const headers = {
    "Content-Type": "multipart/form-data",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios
      .post("http://3.84.137.243:5001/create_document", postImage.myFile, {
        headers,
      })
      .then((response) => {
        console.log("response data:", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("DOCUMENT_REF_ID", "12");
    formdata.append("DOCUMENT_ADMIN_USERNAME", "deepanshu1");
    setPostImage({ myFile: formdata });
  };

  // gettting the image dta

  const getalldocument = async () => {
    try {
      console.log(";;;++++++++++++++++");
      const response = await axios.put(
        "http://3.84.137.243:5001/get_all_document",
        {
          DOCUMENT_REF_ID_1: 12,
          DOCUMENT_ADMIN_USERNAME_1: "deepanshu1",
        },
        { headers }
      );
      // setTimeout(() => {
      const imageApiData = response.data;
      setImagesData(imageApiData.data);
      console.log("my data=:", imageApiData);
      // }, 1000);
    } catch (error) {
      console.log("Error Fetching Data :", error);
    }
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            label="Image"
            name="myFile"
            accept=".jpeg, .png, .jpg, .pdf"
            onChange={(e) => handleFileUpload(e)}
          />

          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>

      <hr />

      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Company Documents
          </Typography>
          <Demo>
            <List>
              {imagesData?.map((image, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={image.name} />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
        <Button onClick={getalldocument}>Get Document</Button>
      </Box>
    </>
  );
}
