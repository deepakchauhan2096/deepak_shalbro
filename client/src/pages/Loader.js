import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const Loader = () => {

    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
      setOpen(true);
    };
    const handleOpen = () => {
      setOpen(true);
    };

    // window.location.reload(true);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Loader