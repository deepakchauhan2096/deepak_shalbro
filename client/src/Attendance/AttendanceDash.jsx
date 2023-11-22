import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Fab, Paper, styled } from "@mui/material";
import { Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import CompanyCreate from "./Attendance";
import { useNavigate } from "react-router-dom";
import ProjectCreate from "../company/ProjectCreate";
import Modal from "@mui/material/Modal";
import env from "react-dotenv";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AttendanceDash = (props) => {
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [update, setUpdateData] = React.useState(null);
  const [tableRows, setTableRows] = useState([{
    ADMIN_ID: "",
    ADMIN_EMAIL: "meenu@gmail.com",
    ADMIN_USERNAME: "Meenu12345",
  }]);
  const [Rows, setRows] = useState([
    {
      COMPANY_ID: "",
      COMPANY_USERNAME: "",
    },
  ]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    getAdminData();
  }, [props.user]);

  // const headers = {
  //   "Content-Type": "application/json",
  //   authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  // };

  const getAdminData = async () => {
    try {
      const response = await axios.put(
        "/api/get_admin",
        { ADMIN_EMAIL: props?.email, ADMIN_USERNAME: props?.user },
      
      );
      setTimeout(() => {
        console.log("response.data : ", response.data);
        const data = response.data;
        setTableRows(data.result[0]);
      }, 1000);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };



  const getCompanyData = async () => {
    try {
      const response = await axios.put(
        "/api/get_all_company",
        {
          COMPANY_PARENT_ID: tableRows?.ADMIN_ID,
          COMPANY_PARENT_USERNAME: props.user,
        },
    
      );
      setTimeout(() => {
        console.log("response.data : ", response.data);
        const data = response.data;
        setRows(data.result);
      }, 1000);
      // setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, [tableRows, update]);

  // Mine work
  const NavigateTo = useNavigate();

  const ShowCompDetail = (props) => {
    return NavigateTo("/company", { state: { props } });
  };

  const MyScreen = styled(Paper)((props) => ({
    // height: "calc(100vh - 37px)",
    height: "100vh",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? "block" : "none",
    width: "100%",
    // background:"pink"
  }));
  
  const MyScreenbox = styled(Paper)((props) => ({
    height: "calc(100vh - 68.5px)",
    // height: "100vh",
    padding: "50px",
    paddingBottom: "0",
    overflow: "scroll",
    borderRadius: 0,
    Border: 0,
    width: "100%",
    position: "relative",
    background: "#f9f9f9",
  }));

  const StyledFab = styled(Fab)({
    display: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    justifyItems: "center",
  });

  const settings = [props.email, "Account", "Dashboard", "Logout"];
  const pages = [props.email, tableRows?.ADMIN_ID];

  return (
    <>
      <MyScreen screenIndex={true}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {props.user}
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  //   fontFamily: 'monospace',
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {props.user}
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={props.user}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <MyScreenbox screenIndex={true}>
          <CompanyCreate
            ID={tableRows?.ADMIN_ID}
            Username={tableRows?.ADMIN_USERNAME}
            Update={(e) => setUpdateData(e)}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {[
                    "Company Name",
                    "Company ID",
                    "Company username",
                    "Phone",
                    "Email",
                    "Address",
                    "State",
                    "Detail",
                  ].map((item) => (
                    <TableCell size="large">{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Rows?.map((post) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* <TableCell component="th" scope="row"></TableCell> */}
                      <TableCell size="small">{post.COMPANY_NAME}</TableCell>
                      <TableCell size="small">{post.COMPANY_ID}</TableCell>
                      <TableCell size="small">
                        {post.COMPANY_USERNAME}
                      </TableCell>
                      <TableCell size="small">{post.COMPANY_PHONE}</TableCell>
                      <TableCell size="small">{post.COMPANY_EMAIL}</TableCell>
                      <TableCell size="small">{post.COMPANY_ADD2}</TableCell>
                      <TableCell size="small">{post.COMPANY_STATE}</TableCell>
                      <TableCell size="small">
                        <Button onClick={(e) => ShowCompDetail(post)}>
                          {" "}
                          view
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MyScreenbox>
      </MyScreen>
    </>
  );
};

export default AttendanceDash;
