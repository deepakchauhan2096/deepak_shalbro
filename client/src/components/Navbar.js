import React from 'react'

const Navbar = ({ toggle, name }) => {
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
        </div>
      </nav>
    </div>
  )
}

export default Navbar
