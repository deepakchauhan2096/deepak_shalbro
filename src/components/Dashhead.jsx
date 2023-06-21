
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
                class=" col-3 card"
                style={{ width: "18rem", height: "150px" }}
              >
                <div class="card-body">
                  <h5 class="card-title text-primary">All Contracts</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    Total Contracts : 300
                  </h6>
                  <p class="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing
               
                  </p>
                </div>
              </div>
                {/*```````---------------------------------- Supplier  */}

              <div
                class=" col-3 card mx-2"
                style={{ width: "18rem", height: "150px" }}
              >
                <div class="card-body">
                  <h5 class="card-title  text-primary">Supplier</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary text-primary">
                  Total Supplier: 400 
                  </h6>
                  <p class="card-text">
                    Some quick example text to build on the card .
                  </p>
                </div>
              </div>

                {/*```````---------------------------------- Employees  */}

              <div
                class=" col-3 card"
                style={{ width: "18rem", height: "150px" }}
              >
                <div class="card-body">
                  <h5 class="card-title  text-primary">Employees</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary text-primary">
                   Total Employees:200
                  </h6>
                  <p class="card-text">
                    Some quick example text to build on 
                  </p>
                </div>
              </div>
            </div>

            <div className="row p-2">

                {/*```````---------------------------------- Contractors  */}

              <div
                class=" col-3 card"
                style={{ width: "18rem", height: "150px",cursor:"pointer" }}
              >
                <div class="card-body">
                  <h5 class="card-title text-primary">All Contractors</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    Total Contracts : 200
                  </h6>
                  <p class="card-text">
                    Information about all tha Contractors.
               
                  </p>
                </div>
              </div>

              {/* ----------------------------------------- Sub-Contractors */}
              <div
                class=" col-3 card mx-2"
                style={{ width: "18rem", height: "150px",cursor:"pointer" }}
              >
                <div class="card-body">
                  <h5 class="card-title  text-primary">Sub-Contractors</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary text-primary">
                  Total Supplier: 400 
                  </h6>
                  <p class="card-text">
                  Information about all tha Sub-Contractors.
                  </p>
                </div>
              </div>
              {/* ----------------------------------- Documents */}
              <div
                class=" col-3 card"
                style={{ width: "18rem", height: "150px",cursor:"pointer" }}
              >
                <div class="card-body">
                  <h5 class="card-title  text-danger">Documents</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary text-primary">
                   Total Documents
                  </h6>
                  <p class="card-text">
                    All Documents of the Parent Company.
                  </p>
                </div>
              </div>
            </div>

            <div className="row p-2">
              {/* ----------------------------------- All Payments */}

              <div
                class=" col-3 card"
                style={{ width: "18rem", height: "150px" , cursor:"pointer"}}
              >
                <div class="card-body">
                  <h5 class="card-title text-success">All Payments</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    Total Contracts : 300
                  </h6>
                  <p class="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing
               
                  </p>
                </div>
              </div>
              {/* ----------------------------------- Reminders */}

              <div
                class=" col-3 card mx-2"
                style={{ width: "18rem", height: "150px", cursor:"pointer"}}
              >
                <div class="card-body">
                  <h5 class="card-title  text-warning">Reminders</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary text-warning">
                 All Reminders
                  </h6>
                  <p class="card-text">
                    Some quick example text to build on the card .
                  </p>
                </div>
              </div>

           
            </div>
          </div>
          <div className="col-3 p-2">
            
            <div className="row p-2 border border-0">

              {/* ----------------------------------- Project Status */}

            <div class="card" style={{ width: "18rem"}}>
              <div class="card-body ">
                <h5 class="card-title">Project Status</h5>
                <ol class="list-group list-group-numbered ">
                  <li class="list-group-item d-flex justify-content-between align-items-start  border border-0 ">
                    <div class="ms-2 me-auto">
                      <div class="fw-bold">Pending</div>
                      Date and timing is here
                    </div>
                    <span class="badge bg-warning rounded-pill">14</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div class="ms-2 me-auto">
                      <div class="fw-bold">Project Complete</div>
                      Content for list item
                    </div>
                    <span class="badge bg-success rounded-pill">14</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div class="ms-2 me-auto">
                      <div class="fw-bold"> Waiting for Approval</div>
                      Date and Time is here
                    </div>
                    <span class="badge bg-primary rounded-pill">14</span>
                  </li>
                </ol>
              </div>
            </div>
            </div>

            {/* ------------------------------- Payment Status */}
            <div class="card" style={{ width: "18rem", }}>
              <div class="card-body">
                <h5 class="card-title">Payment Status</h5>
                <ol class="list-group list-group-numbered">
                  <li class="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div class="ms-2 me-auto">
                      <div class="fw-bold">Pending</div>
                      Date and timing is here
                    </div>
                    <span class="badge bg-warning rounded-pill">14</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div class="ms-2 me-auto">
                      <div class="fw-bold">Payment Complete</div>
                      payment date and 
                    </div>
                    <span class="badge bg-success rounded-pill">14</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-start  border border-0">
                    <div class="ms-2 me-auto">
                      <div class="fw-bold"> Waiting for Approval</div>
                      Date and Time is here
                    </div>
                    <span class="badge bg-primary rounded-pill">14</span>
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
