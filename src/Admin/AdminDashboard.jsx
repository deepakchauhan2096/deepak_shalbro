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
import { Fab, Paper, styled, Skeleton } from "@mui/material";
import { Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import CompanyCreate from "./CompanyCreate";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectCreate from "../company/ProjectCreate";
import Modal from "@mui/material/Modal";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import CompanyEdit from "./CompanyEdit";
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import { initAdmin_fun, initCompany_fun, selectedCompany_fun } from "../redux/action";
import CompanyDelete from "./CompanyDelete";
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

const AdminDashboard = (props) => {
  const location = useLocation();
  const adminData = location.state?.data.result;
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [update, setUpdateData] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tableRows, setTableRows] = useState(adminData);
  const [Rows, setRows] = useState([]);

  const dispatch = useDispatch()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  useEffect(() => {
    getCompanyData();
  }, [tableRows, update]);

  const getCompanyData = async () => {
    try {
      const response = await axios.put(
        "http://18.211.130.168:5001/get_all_company",
        {
          COMPANY_PARENT_ID: tableRows?.ADMIN_ID,
          COMPANY_PARENT_USERNAME: tableRows?.ADMIN_USERNAME,
        },
        { headers }
      );
      setTimeout(() => {
        // console.log("response.data : ", response.data);
        const data = response.data;
        setRows(data.result);
        dispatch(initCompany_fun(data.result))
      }, 1000);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const MyScreen = styled(Paper)((props) => ({
    height: "100vh",
    padding: 0,
    paddingBottom: "0",
    overflow: "auto",
    borderRadius: 0,
    Border: 0,
    display: props.screenIndex ? "block" : "none",
    width: "100%",
  }));

  const MyScreenbox = styled(Paper)((props) => ({
    height: "calc(100vh - 68.5px)",
    padding: "50px",
    paddingBottom: "0",
    overflow: "scroll",
    borderRadius: 0,
    Border: 0,
    width: "100%",
    position: "relative",
    background: "#f9f9f9",
  }));

  const settings = [
    tableRows?.ADMIN_USERNAME,
    "Account",
    "Dashboard",
    "Logout",
  ];
  const pages = [tableRows?.ADMIN_EMAIL, tableRows?.ADMIN_ID];

  //send data to company dashboard
  const navigate = useNavigate();

  const ShowCompDetail = (props) => {
    return navigate("/company", { state: { props } });
  };

  const Animations = () => {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton animation="pulse" height={100} />
        <Skeleton animation="pulse" height={70} />
        <Skeleton animation="pulse" height={70} />
        <Skeleton animation="pulse" height={50} />
        <Skeleton animation="pulse" height={70} />
      </Box>
    );
  };

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
                {adminData?.ADMIN_USERNAME}
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
                {adminData?.ADMIN_USERNAME}
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
            </Toolbar>
          </Container>
        </AppBar>
        <MyScreenbox screenIndex={true}>
          {Rows.length === 0 ?
            <div style={{
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px"
            }}>

              <p style={{
                fontFamily: "monospace",
                color: "grey",
                marginBottom: "10px"
              }}>
                There is no data. Please create a company to move forward.
              </p>
              <CompanyCreate
                btnstyle={{ position: "relative", right: "270px" }}
                ID={adminData?.ADMIN_ID}
                Username={adminData?.ADMIN_USERNAME}
                Update={(e) => setUpdateData(e)}
              />
            </div>
            :
            <>
              <CompanyCreate
                ID={adminData?.ADMIN_ID}
                Username={adminData?.ADMIN_USERNAME}
                Update={(e) => setUpdateData(e)}
              />

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  {Rows.length > 0 ? <TableHead>
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
                        "Edit",
                        //  "Delete"
                      ].map((item) => (
                        <TableCell size="large">{item}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead> : ""}
                  <TableBody>
                    {Rows?.map((post) => (
                      <>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell size="small">{post?.COMPANY_NAME}</TableCell>
                          <TableCell size="small">{post?.COMPANY_ID}</TableCell>
                          <TableCell size="small">
                            {post?.COMPANY_USERNAME}
                          </TableCell>
                          <TableCell size="small">
                            {post?.COMPANY_PHONE}
                          </TableCell>
                          <TableCell size="small">
                            {post?.COMPANY_EMAIL}
                          </TableCell>
                          <TableCell size="small">{post?.COMPANY_ADD2}</TableCell>
                          <TableCell size="small">
                            {post?.COMPANY_STATE}
                          </TableCell>
                          <TableCell size="small">
                            <Tooltip title="View Detail">
                              <PlaylistPlayOutlinedIcon
                                onClick={(e) => ShowCompDetail(post)}
                                color="primary"
                                style={{ cursor: "pointer" }}
                              />
                            </Tooltip>
                          </TableCell>
                          <TableCell size="small">

                            <CompanyEdit companyEDit={post} reFetchfun={getCompanyData} />

                          </TableCell>
                          {/* <TableCell size="small">
                         <CompanyDelete/>
                        </TableCell> */}
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          }

        </MyScreenbox>
      </MyScreen>
    </>
  );
};

export default AdminDashboard;
