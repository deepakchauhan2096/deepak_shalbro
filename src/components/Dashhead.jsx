
import React from "react";

const Dashhead = () => {
  return (
    <>
      <div className="container m-4">
        <div className="row ">
          <div className="col-9">
            <div className="row p-2">

                {/*```````---------------------------------- Contracts  */}
              <div
                className=" col-3 card"
                style={{ width: "18rem", height: "150px" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">All Contracts</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Total Contracts : 300
                  </h6>
                  <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing
               
                  </p>
                </div>
              </div>
                {/*```````---------------------------------- Supplier  */}

              <div
                className=" col-3 card mx-2"
                style={{ width: "18rem", height: "150px" }}
              >
                <div className="card-body">
                  <h5 className="card-title  text-primary">Supplier</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary text-primary">
                  Total Supplier: 400 
                  </h6>
                  <p className="card-text">
                    Some quick example text to build on the card .
                  </p>
                </div>
              </div>

                {/*```````---------------------------------- Employees  */}

              <div
                className=" col-3 card"
                style={{ width: "18rem", height: "150px" }}
              >
                <div className="card-body">
                  <h5 className="card-title  text-primary">Employees</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary text-primary">
                   Total Employees:200
                  </h6>
                  <p className="card-text">
                    Some quick example text to build on 
                  </p>
                </div>
              </div>
            </div>

            <div className="row p-2">

                {/*```````---------------------------------- Contractors  */}

              <div
                className=" col-3 card"
                style={{ width: "18rem", height: "150px",cursor:"pointer" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">All Contractors</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Total Contracts : 200
                  </h6>
                  <p className="card-text">
                    Information about all tha Contractors.
               
                  </p>
                </div>
              </div>

              {/* ----------------------------------------- Sub-Contractors */}
              <div
                className=" col-3 card mx-2"
                style={{ width: "18rem", height: "150px",cursor:"pointer" }}
              >
                <div className="card-body">
                  <h5 className="card-title  text-primary">Sub-Contractors</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary text-primary">
                  Total Supplier: 400 
                  </h6>
                  <p className="card-text">
                  Information about all tha Sub-Contractors.
                  </p>
                </div>
              </div>
              {/* ----------------------------------- Documents */}
              <div
                className=" col-3 card"
                style={{ width: "18rem", height: "150px",cursor:"pointer" }}
              >
                <div className="card-body">
                  <h5 className="card-title  text-danger">Documents</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary text-primary">
                   Total Documents
                  </h6>
                  <p className="card-text">
                    All Documents of the Parent Company.
                  </p>
                </div>
              </div>
            </div>

            <div className="row p-2">
              {/* ----------------------------------- All Payments */}

              <div
                className=" col-3 card"
                style={{ width: "18rem", height: "150px" , cursor:"pointer"}}
              >
                <div className="card-body">
                  <h5 className="card-title text-success">All Payments</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Total Contracts : 300
                  </h6>
                  <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing
               
                  </p>
                </div>
              </div>
              {/* ----------------------------------- Reminders */}

              <div
                className=" col-3 card mx-2"
                style={{ width: "18rem", height: "150px", cursor:"pointer"}}
              >
                <div className="card-body">
                  <h5 className="card-title  text-warning">Reminders</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary text-warning">
                 All Reminders
                  </h6>
                  <p className="card-text">
                    Some quick example text to build on the card .
                  </p>
                </div>
              </div>

           
            </div>
          </div>
          <div className="col-3 p-2">
            
            <div className="row p-2 border border-0">

              {/* ----------------------------------- Project Status */}

            <div className="card" style={{ width: "18rem"}}>
              <div className="card-body ">
                <h5 className="card-title">Project Status</h5>
                <ol className="list-group list-group-numbered ">
                  <li className="list-group-item d-flex justify-content-between align-items-start  border border-0 ">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Pending</div>
                      Date and timing is here
                    </div>
                    <span className="badge bg-warning rounded-pill">14</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Project Complete</div>
                      Content for list item
                    </div>
                    <span className="badge bg-success rounded-pill">14</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold"> Waiting for Approval</div>
                      Date and Time is here
                    </div>
                    <span className="badge bg-primary rounded-pill">14</span>
                  </li>
                </ol>
              </div>
            </div>
            </div>

            {/* ------------------------------- Payment Status */}
            <div className="card" style={{ width: "18rem", }}>
              <div className="card-body">
                <h5 className="card-title">Payment Status</h5>
                <ol className="list-group list-group-numbered">
                  <li className="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Pending</div>
                      Date and timing is here
                    </div>
                    <span className="badge bg-warning rounded-pill">14</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Payment Complete</div>
                      payment date and 
                    </div>
                    <span className="badge bg-success rounded-pill">14</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold"> Waiting for Approval</div>
                      Date and Time is here
                    </div>
                    <span className="badge bg-primary rounded-pill">14</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>


        
      </div>
    </>
  );
};

export default Dashhead;
