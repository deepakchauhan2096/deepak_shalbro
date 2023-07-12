import React from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditEmployee from "../modal/EditEmployee";


const ITEM_HEIGHT = 48;

const Menus = () => {

  const options = ["Add", <EditEmployee />,"Delete"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const handleClicks = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={opens ? "long-menu" : undefined}
        aria-expanded={opens ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClicks}
      >
        <MoreVertIcon sx={{ fontSize: "18px" }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={opens}
        onClose={handleCloses}
        PaperProps={{
          sx: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            // onClick={handleCloses}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Menus;
