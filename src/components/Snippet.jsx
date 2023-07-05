import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useRef } from "react";

const Snippet = () => {
  const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  };

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const carditem = [
    {
      name: "To do",
      work: [
        {
          text1: "1",
          text2: "2",
          text3: "3",
        },
        {
          text1: "1",
          text2: "2",
          text3: "3",
        },
        {
          text1: "1",
          text2: "2",
          text3: "3",
        },
        {
          text1: "1",
          text2: "2",
          text3: "3",
        },
        {
          text1: "1",
          text2: "2",
          text3: "3",
        },
        {
          text1: "1",
          text2: "2",
          text3: "3",
        },
      ],
    },
    {
      name: "In Progress",
      work: [],
    },
    {
      name: "Done",
      work: [],
    },
    {
      name: "Panding",
      work: [],
    }
  ];

   


  return (
    <>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid container justifyContent="center" spacing={2}>
          {carditem.map((post, value) => (
            <Grid item xs={3}>
              <Grid key={value} item>
                <Paper
                  sx={{
                    height: "calc(100vh - 85px)",
                    width: "100%",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#f9f9f9",
                    flexGrow: 1,
                    // padding: 1.5,
                    overflow: "hidden",
                    position: "relative"
                  }}
                  
                >
                  <Box sx={{background: "#fff", top: 0, padding:"10px" }}>
                    <Typography variant="b">{post.name}</Typography>
                  </Box>
                  <Box 
                  padding={1} 
                  id={value}
                  onDrop={(event) => drop(event)}
                  onDragOver={(event) => allowDrop(event)}
                  sx={{
                    height:"calc(100vh - 175px)",
                    overflowY:"scroll",
                    background:"#f9f9f9"
                  }}
                  >
                    {post.work.map((workpost, workindex) => (
                      <Paper
                        sx={{
                          height: "auto",
                          width: "100%",
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                          flexGrow: 1,
                          marginBottom: 2,
                          padding:1.2
                        }}
                        id={value + "" + workindex}
                        draggable="true"
                        onDragStart={(event) => drag(event)}
                        spacing={1}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque nesciunt incidunt illo sed corrupti vero, laborum esse non, rerum recusandae expedita sint eligendi doloremque placeat. Voluptates molestias tempora fuga cum?
                      </Paper>
                    ))}
                  </Box>
                  <Box sx={{ position: "sticky", background: "#fff", bottom: 0, padding:"10px" }}>
                    <Typography variant="b">+ Add</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* <div
        className="div1"
        id=""
        onDrop={(event) => drop(event)}
        onDragOver={(event) => allowDrop(event)}
      >
      </div> */}

      {/* <br />
      <img
        id="drag1"
        src="img_logo.gif"
        draggable="true"
        onDragStart={(event) => drag(event)}
        width="336"
        height="69"
      /> */}
    </>
  );
};

export default Snippet;
