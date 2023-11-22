import React from 'react'

const Navbar = ({toggle, name}) => {
  return (
    <div className="content display-sidebar-mobile">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="#">
              {name}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
                <a className="nav-item nav-link" href="#">
                  Features
                </a>
                <a className="nav-item nav-link" href="#">
                  Pricing
                </a>
                <a className="nav-item nav-link disabled" href="#">
                  Disabled
                </a>
              </div>
            </div> */}
          </div>
        </nav>
        </div>
  )
}

export default Navbar
