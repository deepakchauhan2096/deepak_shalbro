import { Box, Grid, Paper, Typography, IconButton } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Snippet = () => {
  const drag = (ev, cardIndex, workIndex) => {
    ev.dataTransfer.setData("text", cardIndex + "," + workIndex);
  };

  const drop = (ev, targetCardIndex) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text").split(",");
    const sourceCardIndex = parseInt(data[0]);
    const workIndex = parseInt(data[1]);

    if (sourceCardIndex !== targetCardIndex) {
      const updatedCardItem = [...carditem];
      const [movedWork] = updatedCardItem[sourceCardIndex].work.splice(
        workIndex,
        1
      );
      updatedCardItem[targetCardIndex].work.push(movedWork);

      setCardItem(updatedCardItem);
    }
  };

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const addTask = (cardIndex) => {
    const updatedCardItem = [...carditem];
    updatedCardItem[cardIndex].work.push({
      text1: "",
      text2: "",
      text3: "",
    });

    setCardItem(updatedCardItem);
  };

  const [carditem, setCardItem] = React.useState([
    {
      name: "To do",
      work: [
        {
          text1: "1",
          text2: "2",
          text3: "3",
        },
        // ... (other work items)
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
      name: "Pending",
      work: [],
    },
  ]);

  return (
    <Grid sx={{ flexGrow: 1, backgroundColor:"blue" }}>
      <Grid container justifyContent="center" spacing={2}>
        {carditem.map((post, cardIndex) => (
          <Grid item xs={3} key={cardIndex}>
            <Grid key={cardIndex} item>
              <Paper
                sx={{
                  height: "calc(100vh - 85px)",
                  width: "100%",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#f9f9f9",
                  flexGrow: 1,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box sx={{ background: "#fff", top: 0, padding: "10px" }}>
                  <Typography variant="b">{post.name}</Typography>
                </Box>
                <Box
                  padding={1}
                  id={cardIndex}
                  onDrop={(event) => drop(event, cardIndex)}
                  onDragOver={(event) => allowDrop(event)}
                  sx={{
                    height: "calc(100vh - 175px)",
                    overflowY: "scroll",
                    background: "#f9f9f9",
                  }}
                >
                  {post.work.map((workpost, workIndex) => (
                    <Paper
                      key={workIndex}
                      sx={{
                        height: "auto",
                        width: "100%",
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                        flexGrow: 1,
                        marginBottom: 2,
                        padding: 1.2,
                      }}
                      id={cardIndex + "" + workIndex}
                      draggable="true"
                      onDragStart={(event) => drag(event, cardIndex, workIndex)}
                      spacing={1}
                    >
                      {workpost.text1} {workpost.text2} {workpost.text3}
                    </Paper>
                  ))}
                </Box>
                <Box
                  sx={{
                    position: "sticky",
                    background: "#fff",
                    bottom: 0,
                    padding: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    aria-label="Add Task"
                    onClick={() => addTask(cardIndex)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Snippet;
