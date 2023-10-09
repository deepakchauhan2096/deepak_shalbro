/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyCreate from "./CompanyCreate";
import CompanyEdit from "./CompanyEdit";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"
import { signOut } from "firebase/auth";
const itemsPerPage = 8;

const AdminDashboard = (props) => {
  const { adminData } = props
  const tableRows = adminData;
  const [RowsData, setRows] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayType, setDisplayType] = useState(true);

  function reverseArray(arr) {
    let reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    return reversed;
  }
  let Rows = reverseArray(RowsData);




  const displayTab = () => {
    setDisplayType(false);
  };

  const displayTable = () => {
    setDisplayType(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getCompanyData();
  }, [tableRows]);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const getCompanyData = async () => {
    try {
      const response = await axios.put(
        "/get_all_company",
        {
          COMPANY_PARENT_ID: tableRows?.ROOT_ID,
          COMPANY_PARENT_USERNAME: tableRows?.ROOT_USERNAME,
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


  const handleLogout = async () => {
    signOut(auth).then(() => {
      navigate("/login");
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
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

  console.log(tableRows, "tableRows")

  return (
    <>
      <div className="container-fluid g-0">
        <nav
          class="navbar navbar-expand-lg navbar-dark bg-dark position-sticky top-0"
          style={{ marginBottom: 0 }}
        >
          <div className="container justify-content-between">
            <a
              href="#"
              className="text-white text-decoration-none navbar-brand"
            >
              {tableRows?.ROOT_USERNAME} (Admin)
            </a>
            <button
              class="btn btn-outline-primary my-2 my-sm-0 btn-sm"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <nav
          class="navbar navbar-expand-lg navbar-light bg-light"
          style={{ height: "40px" }}
        >
          <div className="container">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a className="bg-white text-dark nav-link ">My Companies</a>
                {/* <a className="bg-light text-dark nav-link">Companies</a> */}
              </div>
            </div>
          </div>
        </nav>


        <div className="container">
          <div className="row">
            <div className="col-xl-12 overflow-auto pt-2">
              <div className="justify-between">
                <div
                  style={{ display: "flex", justifyContent: "space-between", padding: "10px 5px" }}
                >
                  <CompanyCreate
                    ROOT_ID={adminData?.ROOT_ID}
                    ROOT_USERNAME={adminData?.ROOT_USERNAME}
                    Update={getCompanyData}
                  />
                </div>
              </div>
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
                        class="btn-group btn-sm display"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          onClick={displayTable}
                        >
                          <i class="fa fa-th-list" aria-hidden="true"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          onClick={displayTab}
                        >
                          <i class="fa fa-th-large" aria-hidden="true"></i>
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
                    <table class="table table-striped table-sm pt-4 table-fixed display">
                      {displayData.length > 0 ? <thead>
                        <tr style={{ width: "100%" }}>
                          <th>S.no.</th>
                          <th>Name</th>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>State</th>
                          <th>Edit</th>
                          <th>Detail</th>
                        </tr>
                      </thead> : "loading..."}

                      <tbody>
                        {displayData.map((post, index) => (
                          <tr key={post.COMPANY_ID}>
                            <td>{startIndex+index+1}</td>
                            <td>{post.COMPANY_NAME}</td>
                            <td>{post.COMPANY_ID}</td>
                            <td>{post.COMPANY_USERNAME}</td>
                            <td>{post.COMPANY_PHONE}</td>
                            <td>{post.COMPANY_EMAIL}</td>
                            <td>{post.COMPANY_ADD2}</td>
                            <td>{post.COMPANY_STATE}</td>
                            <td>
                              <CompanyEdit
                                companyEDit={post}
                                reFetchfun={getCompanyData}
                              />
                            </td>
                            <td>
                              <Link
                                to={`/company/${post.COMPANY_ID}&${post.COMPANY_USERNAME}&${post.COMPANY_ROOT_ID}&${post.COMPANY_ROOT_USERNAME}`}
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
                            class="card my-1"
                            style={{
                              width: "100%",
                              height: "150px"
                            }}
                            key={index}
                          >
                            <div

                              class="card-body postion-relative"
                              style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                              }}
                            >
                              <h6 class="card-title">
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
                        class="card my-1"
                        style={{
                          width: "100%",
                          background: index % 2 === 0 ? "#f3f3f3" : "#fffff",
                        }}
                        key={index}
                      >
                        <div class="card-body ">
                          <h6 class="card-title">
                            {post.COMPANY_NAME} - {post.COMPANY_ID}
                          </h6>
                          <div class="d-flex space-between">
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
              </div>  </>) : (
            <div className="container">no data available</div>
          )}
        </div>

      </div>
    </>
  );
};

export default AdminDashboard;
