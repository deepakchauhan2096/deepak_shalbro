/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyCreate from "./CompanyCreate";
import CompanyEdit from "./CompanyEdit";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase.mjs"
import { signOut } from "firebase/auth";
import InputControl from "../components/InputControl";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const itemsPerPage = 8;

const AdminDashboard = ({props}) => {
  console.log("this is props :",props);
  // const { state } = useLocation()
  console.log(props, "tableRows")
  const tableRows = props.adminData;
  const [RowsData, setRows] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayType, setDisplayType] = useState(true);
  const [detail, setDetail] = useState();

  function reverseArray(arr) {
    let reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    return reversed;
  }
  let Rows = reverseArray(RowsData);




  // const displayTab = () => {
  //   setDisplayType(false);
  // };

  // const displayTable = () => {
  //   setDisplayType(true);
  // };

  const navigate = useNavigate();

  useEffect(async() => {
    await props.userName()
    await getCompanyData();
  }, [tableRows]);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const getCompanyData = async () => {
    try {
      const response = await axios.put(
        "/api/get_all_company",
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
      }, 1000);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);

    }
  };


  // const handleLogout = async () => {
  //   signOut(auth).then(() => {
  //     navigate("/login");
  //     // Sign-out successful.
  //   }).catch((error) => {
  //     // An error happened.
  //   });
  // };

  const handleLogout = async () => {
    // console.log("hola")
    try {
      const response = await axios.get('/api/logout');
      console.log("hola", response)
      if (response?.status === 200) {
        // errorMsg(null);
        navigate("/root");
        // console.log("fuck")

      }
    } catch (error) {
      // Handle network or other errors
    }
  };


  const displayData = [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, Rows.length);

  for (let i = startIndex; i < endIndex; i++) {
    displayData.push(Rows[i]);
  }

  const maxPage = Math.ceil(Rows.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const totalPages = Math.ceil(Rows.length / itemsPerPage);

    const maxButtons = 3; // Maximum of 3 page buttons

    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, startPage + maxButtons - 1);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={
            currentPage === i
              ? "active btn btn-secondary btn-sm"
              : "btn btn-secondary btn-sm"
          }
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };


  const Details = ({ data }) => {

    const [edit, setEdit] = useState(true)
    const [values, setValues] = useState({
      name: `${data.COMPANY_ID}&&${data.COMPANY_USERNAME}&&${tableRows?.ADMIN_ID}&&${tableRows?.ADMIN_USERNAME}&&company`,
      email: data.COMPANY_USERNAME,
      pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
      if (!values.name || !values.email || !values.pass) {
        setErrorMsg("Fill all fields");
        return;
      }
      setErrorMsg("");

      setSubmitButtonDisabled(true);
      createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then(async (res) => {
          setSubmitButtonDisabled(false);
          const user = res.user;
          await updateProfile(user, {
            displayName: values.name,
          });
          // navigate("/dashboard");
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          setErrorMsg(err.message);
        });
    };

    console.log(data, "datainside")
    return (
      <>
        <div className="d-flex" style={{ gap: 4 }}>

          <button className="btn btn-sm btn-warning">
            Basic
          </button>
          {edit ? <button className="btn btn-sm btn-secondary" onClick={() => setEdit(false)}>
            Edit
          </button> : <button className="btn btn-sm btn-success" onClick={() => setEdit(true)}>
            Save
          </button>}

        </div>
        <div>
          <center>
            {errorMsg && (
              <p className=" text-danger fw-light mb-0 fs-6">{errorMsg}</p>
            )}
          </center>
        </div>

        <h2 className="text-end">{data.COMPANY_NAME}</h2>
        <table className="table" style={{ tableLayout: "" }}>
          <tbody >
            <tr>
              <td><b>Company Id:</b></td>
              <td>{data.COMPANY_ID}</td>
            </tr>
            <tr>
              <td><b>Company Address:</b></td>
              <td>{data.COMPANY_ADD2 ? data.COMPANY_ADD2 : "Not Available"} | {data.COMPANY_STATE}</td>
            </tr>
            <tr>
              <td><b>Phone :</b></td>
              <td>{data.COMPANY_PHONE}</td>
            </tr>
            <tr>
              <td><b>Email :</b></td>
              <td>{data.COMPANY_USERNAME}</td>
            </tr>

            <tr>
              <td><b>Password :</b></td>
              <td className="d-flex" style={{ gap: 4 }}>  {!edit ? <><InputControl
                className="form-control-2"
                placeholder="Enter password"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
              /><button className="btn btn-sm btn-primary" onClick={handleSubmission} disabled={submitButtonDisabled}>
                  Generate Credential
                </button></> : <InputControl
                className="form-control-2"
                value={"*******"}
           
                disabled
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
              />}
              </td>
            </tr>

            <tr>
              <td><b>Subscription :</b></td>
              {edit ? <td>Basic</td> :
                <>
                  <td className="d-flex" style={{ gap: 4 }}>

                    <input type="radio" id="Basic" name="fav_language" value="Basic" />
                    <label for="Basic">Basic</label><br />
                    <input type="radio" id="Silver" name="fav_language" value="Silver" />
                    <label for="Silver">Silver</label><br />
                    <input type="radio" id="gold" name="fav_language" value="Gold" />
                    <label for="gold">Gold</label>
                  </td>
                </>

              }


            </tr>

          </tbody >
        </table >
      </>

    )
  }

  const HandleDetail = (post) => {
    // return <Detail data={post} />
    return setDetail(<Details data={post} />)
  }

  // console.log(detail, "detail")

  return (
    <>
      <div className="container-fluid g-0">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky top-0"
          style={{ marginBottom: 0 }}
        >
          <div className="container justify-content-between">
            <a
              href="#"
              className="text-white text-decoration-none navbar-brand"
            >
              {tableRows?.ADMIN_USERNAME} (Admin)
            </a>
            <button
              className="btn btn-outline-primary my-2 my-sm-0 btn-sm"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{ height: "40px" }}
        >
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="bg-white text-dark nav-link ">My Companies</a>
                {/* <a className="bg-light text-dark nav-link">Companies</a> */}
              </div>
            </div>
          </div>
        </nav>


        <div className="container" style={{ display: "flex", width: "100%", alignItems: "center", margin: "0 auto", justifyContent: "center", height: "80vh" }}>
          <div className="row w-100" style={{ height: "70vh" }}>
            <div className="col-xl-6 overflow-auto pt-2 border">
              <div className="justify-between">
                <div
                  style={{ display: "flex", justifyContent: "space-between", padding: "10px 5px" }}
                >
                  <CompanyCreate
                    ADMIN_ID={tableRows?.ADMIN_ID}
                    ADMIN_USERNAME={tableRows?.ADMIN_USERNAME}
                    Update={getCompanyData}
                  />
                </div>
              </div>


              {Rows.length > 0 ? (
                <>
                  <div className="row">
                    <div className="col-xl-12 overflow-auto pt-2">
                      <div className="justify-between">
                        {/* <div
                      style={{ display: "flex", justifyContent: "space-between", padding: "10px 5px" }}
                    >

                      <div
                        className="btn-group btn-sm display"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={displayTable}
                        >
                          <i className="fa fa-th-list" aria-hidden="true"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={displayTab}
                        >
                          <i className="fa fa-th-large" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div> */}

                        <div style={{ gap: 5, display: "flex" }}>
                          <button
                            onClick={() => handleClick(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-primary btn-sm"
                          >
                            Previous
                          </button>
                          {renderPageButtons()}
                          <button
                            onClick={() =>
                              handleClick(Math.min(currentPage + 1, maxPage))
                            }
                            disabled={currentPage === maxPage}
                            className="btn btn-primary btn-sm"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">

                    <div className="col-xl-12 overflow-auto pt-2">
                      {displayType ? (
                        <table className="table-sm  table-hover table border w-100 table-striped table-sm pt-4 table-fixed display">
                          {displayData.length > 0 ? <thead>
                            <tr style={{ width: "100%" }}>
                              <th>S.no.</th>
                              <th>Name</th>
                              <th>ID</th>
                              <th>Username</th>
                              {/* <th>Phone</th> */}
                              {/* <th>Email</th>
                          <th>Address</th> */}
                              {/* <th>State</th> */}
                              <th>Edit</th>
                              <th>Detail</th>
                            </tr>
                          </thead> : "loading..."}

                          <tbody>
                            {displayData.map((post, index) => (
                              <tr key={post.COMPANY_ID} className="border" style={{ cursor: "pointer" }} onClick={(e) => HandleDetail(post)}>
                                <td className="border">{startIndex + index + 1}</td>
                                <td className="border">{post.COMPANY_NAME}</td>
                                <td className="border">{post.COMPANY_ID}</td>
                                <td className="border">{post.COMPANY_USERNAME}</td>
                                {/* <td className="border">{post.COMPANY_PHONE}</td>
                            <td className="border">{post.COMPANY_EMAIL}</td>
                            <td className="border">{post.COMPANY_ADD2}</td>
                            <td className="border">{post.COMPANY_STATE}</td> */}
                                <td className="border">
                                  <CompanyEdit
                                    companyEDit={post}
                                    reFetchfun={getCompanyData}
                                  />
                                </td>
                                <td>
                                  <Link
                                    to={`/company/${post.COMPANY_ID}&${post.COMPANY_USERNAME}&${post.COMPANY_PARENT_ID}&${post.COMPANY_PARENT_USERNAME}`}
                                    className="text-dark btn btn-info btn-sm"
                                  >
                                    Visit
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="row">
                          {displayData.map((post, index) => (
                            // <div className="row">
                            <div className="col-xl-2 col-sm-6">
                              <div
                                className="card my-1"
                                style={{
                                  width: "100%",
                                  height: "150px"
                                }}
                                key={index}
                              >
                                <div

                                  className="card-body postion-relative"
                                  style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                  }}
                                >
                                  <h6 className="card-title">
                                    {post.COMPANY_NAME} - {post.COMPANY_ID}
                                  </h6>

                                  <div className="w-100">{post.COMPANY_EMAIL} </div>
                                  <div
                                    className="position-absolute d-flex"
                                    style={{
                                      right: "10px",
                                      bottom: "10px",
                                      overflow: "hidden",
                                      gap: 2
                                    }}
                                  >
                                    <CompanyEdit
                                      companyEDit={post}
                                      reFetchfun={getCompanyData}
                                    />
                                    {" "}
                                    <Link
                                      to={`/company/${post.COMPANY_ID}&${post.COMPANY_USERNAME}&${post.COMPANY_PARENT_ID}&${post.COMPANY_PARENT_USERNAME}`}
                                      className="text-primary btn btn-info btn-sm"
                                    >
                                      Visit
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            // </div>
                          ))}
                        </div>
                      )}
                      <div className="mobile-display">
                        {displayData.map((post, index) => (
                          <div
                            className="card my-1"
                            style={{
                              width: "100%",
                              background: index % 2 === 0 ? "#f3f3f3" : "#fffff",
                            }}
                            key={index}
                          >
                            <div className="card-body ">
                              <h6 className="card-title">
                                {post.COMPANY_NAME} - {post.COMPANY_ID}
                              </h6>
                              <div className="d-flex space-between">
                                <div className="w-100">{post.COMPANY_EMAIL} </div>
                                <div className="d-flex" style={{ gap: 2 }}>
                                  <CompanyEdit
                                    companyEDit={post}
                                    reFetchfun={getCompanyData}
                                  />
                                  {" "}
                                  <Link
                                    to={`/company/${post.COMPANY_ID}&${post.COMPANY_USERNAME}&${post.COMPANY_PARENT_ID}&${post.COMPANY_PARENT_USERNAME}`}
                                    className="text-primary btn btn-info"
                                  >
                                    Visit
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </>) : (
                <div className="container">loading....</div>
              )}
            </div>

            <div className="col-xl-6 overflow-auto pt-2 border">
              {detail}
            </div>
          </div>


        </div>

      </div>
    </>
  );
};

export default AdminDashboard;