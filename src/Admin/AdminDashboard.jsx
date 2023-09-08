import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyCreate from "./CompanyCreate";
import CompanyEdit from "./CompanyEdit";
import { Link } from "react-router-dom";


const AdminDashboard = (props) => {
  const adminData = props.state.result;
  const [tableRows, setTableRows] = useState(adminData);
  const [Rows, setRows] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      }, 1000);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="container-fluid g-0">
        <nav
          class="navbar navbar-expand-lg navbar-dark bg-dark"
          style={{ marginBottom: 0 }}
        >
          <div className="container">
            <a class="navbar-brand" href="#">
              {tableRows?.ADMIN_USERNAME} (Admin)
            </a>
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
                <a className="bg-white text-dark nav-link">My profile</a>
                <a className="bg-light text-dark nav-link">Companies</a>
              </div>
            </div>
          </div>
        </nav>

        {Rows ? (
          <div className="container">
            <div className="row">
              <div className="col-12 overflow-auto">
                <h5 className="py-4 text-underline">My Companies</h5>
                <CompanyCreate
                  ID={adminData?.ADMIN_ID}
                  Username={adminData?.ADMIN_USERNAME}
                  Update={getCompanyData}
                />
                <table class="table table-striped table-sm pt-4">
                  <thead>
                    <tr>
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
                    {Rows.map((post) => (
                      <tr key={post.COMPANY_ID}>
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
                        <td><Link to={`/company/${post.COMPANY_ID}&${post.COMPANY_USERNAME}&${post.COMPANY_PARENT_ID}&${post.COMPANY_PARENT_USERNAME}`} className="text-dark">Visit</Link></td>
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
