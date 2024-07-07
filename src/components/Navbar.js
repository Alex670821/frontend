import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({logout, isAuthenticated}) => {
  const guesLinks = () => (
    <Fragment>
      <li className="nav-item">
            <Link className="nav-link d-flex align-items-center me-3" to="/signup">
              <i className="fas fa-bookmark pe-2"></i> Registrarse
            </Link>
      </li>
      <li className="nav-item" style={{ width: '65px' }}>
            <Link className="nav-link d-flex align-items-center" to="/login">
              Sign In
            </Link>
      </li>
    </Fragment>

  );

  const authLinks = () => (
    <li className="nav-item">
      <Link className="nav-link " href='#!' onClick={logout}>Login 
        <i className="fas fa-bookmark pe-2"></i> Registrarse
      </Link>
    </li>
  );



  return (
  // Navbar
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    {/* Container wrapper */}
    <div className="container">
      {/* Navbar brand */}
      <Link className="navbar-brand" to="/">
        <img
          id="MDB-logo"
          src="https://mdbcdn.b-cdn.net/wp-content/uploads/2018/06/logo-mdb-jquery-small.png"
          alt="MDB Logo"
          draggable="false"
          height="30"
        />
      </Link>

      {/* Toggle button */}
      <button
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Collapsible wrapper */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* Left links */}
        <ul className="navbar-nav me-3">
          <li className="nav-item">
            <Link className="nav-link active d-flex align-items-center" to="#">
              <i className="fas fa-bars pe-2"></i>Menu
            </Link>
          </li>
        </ul>
        {/* Left links */}

        <form className="d-flex align-items-center w-100 form-search">
          <div className="input-group">
            <button
              className="btn btn-light dropdown-toggle shadow-0"
              type="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
              style={{ paddingBottom: '0.4rem' }}
            >
              All
            </button>
            <ul className="dropdown-menu dropdown-menu-dark fa-ul">
              <li>
                <Link className="dropdown-item" to="#">
                  <span className="fa-li pe-2">
                    <i className="fas fa-search"></i>
                  </span>
                  All
                </Link>
              </li>
              {/* Otras opciones de dropdown... */}
            </ul>
            <input type="search" className="form-control" placeholder="Search" aria-label="Search" />
          </div>
          <a href="#!" className="text-white">
            <i className="fas fa-search ps-3"></i>
          </a>
        </form>

        <ul className="navbar-nav ms-3">
          <li className="nav-item me-3">
            <Link className="nav-link d-flex align-items-center" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center me-3" to="/signup">
              <i className="fas fa-bookmark pe-2"></i> Registrarse
            </Link>
          </li>
          <li className="nav-item" style={{ width: '65px' }}>
            <Link className="nav-link d-flex align-items-center" to="/login">
              Sign In
            </Link>
          </li>
        </ul>
        {isAuthenticated ? authLinks(): guesLinks()}
      </div>
      {/* Collapsible wrapper */}
    </div>
    {/* Container wrapper */}
  </nav>
  // Navbar
  );
};

const mapStateProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateProps, {logout})(Navbar);
