import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyCreate from "./CompanyCreate";
import CompanyEdit from "./CompanyEdit";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
const itemsPerPage = 8;

const AdminDashboard = (props) => {
  const adminData = props.state.result;
  const [tableRows, setTableRows] = useState(adminData);
  const [Rows, setRows] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
        "http://54.243.89.186:5001/get_all_company",
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

  const logout = () => {
    // Clear a cookie by specifying its name
    Cookies.remove("myResponseData");
    navigate("/login");
  };

  const displayData = Rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const maxPage = Math.ceil(displayData.length / itemsPerPage);

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
          className={currentPage === i ? "active btn btn-secondary btn-sm" : "btn btn-secondary btn-sm"}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

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
              {tableRows?.ADMIN_USERNAME} (Admin)
            </a>
            <button
              class="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
              onClick={logout}
            >
              Logout
            </button>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
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

        {Rows ? (
          <div className="container">
            <div className="row">
              <div className="col-12 overflow-auto pt-2">
                {/* <h5 className="py-4 text-underline">My Companies</h5> */}
                <div className="justify-between">

           
                <CompanyCreate
                  ID={adminData?.ADMIN_ID}
                  Username={adminData?.ADMIN_USERNAME}
                  Update={getCompanyData}
                />
                <div style={{gap:5,display:"flex"}} >
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
                <table class="table table-striped table-sm pt-4">
                  <thead>
                    <tr>
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
                  </thead>

                  <tbody>
                    {displayData.map((post,index) => (
                      
                      <tr key={post.COMPANY_ID}>
                        <td>{index+1}</td>
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
                            to={`/company/${post.COMPANY_ID}&${post.COMPANY_USERNAME}&${post.COMPANY_PARENT_ID}&${post.COMPANY_PARENT_USERNAME}`}
                            className="text-dark"
                          >
                            Visit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                
              </div>
            </div>
          </div>
        ) : (
          <div className="container">loading...</div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
