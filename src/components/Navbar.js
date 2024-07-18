import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import useSubscriptionStatus from "../hooks/SubscriptionStatus";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css"; // Importa el archivo CSS personalizado

const Navbar = ({ isAuthenticated, logout }) => {
  const [redirect, setRedirect] = useState(false);
  const isActiveSubscription = useSubscriptionStatus(isAuthenticated);

  const logoutUser = () => {
    logout();
    setRedirect(true);
  };

  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link d-flex align-items-center" to="/signup">
          <i className="fas fa-bookmark me-2"></i> Registrarse
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link d-flex align-items-center" to="/login">
          <i className="fas fa-sign-in-alt me-2"></i> Sign In
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      {isActiveSubscription ? (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link d-flex align-items-center"
              to="/upload-video"
            >
              <i className="fas fa-video me-2"></i> Crear Video
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center" to="/videos">
              <i className="fas fa-clock me-2"></i> Videos Programados
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link d-flex align-items-center">
              <i
                className="fas fa-crown"
                style={{ color: "gold", fontSize: "24px" }}
              ></i>
            </span>
          </li>
        </Fragment>
      ) : (
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center" to="/subscribe">
            <i className="fas fa-bookmark me-2"></i> Suscripción
          </Link>
        </li>
      )}
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              id="MDB-logo"
              src="https://mdbcdn.b-cdn.net/wp-content/uploads/2018/06/logo-mdb-jquery-small.png"
              alt="MDB Logo"
              draggable="false"
              height="30"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active d-flex align-items-center"
                  to="#!"
                >
                  <i className="fas fa-bars me-2"></i> Menu
                </Link>
              </li>
            </ul>

            <form className="d-flex align-items-center w-100 form-search">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
              <a href="#!" className="text-white">
                <i className="fas fa-search ps-3"></i>
              </a>
            </form>

            {isAuthenticated && (
              <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
                <li className="nav-item text-center mx-2 mx-lg-1">
                  <a className="nav-link d-flex align-items-center" href="#!">
                    <div>
                      <i className="fas fa-bell fa-lg mb-1"></i>
                      <span className="badge rounded-pill badge-notification bg-info">
                        11
                      </span>
                    </div>
                    Messages
                  </a>
                </li>
              </ul>
            )}

            <ul className="navbar-nav ms-3">
              <li className="nav-item me-3">
                <Link className="nav-link d-flex align-items-center" to="/">
                  <i className="fas fa-home me-2"></i> Home
                </Link>
              </li>
              {isAuthenticated ? authLinks() : guestLinks()}
            </ul>
          </div>
        </div>
      </nav>
      {redirect && <Redirect to="/" />}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
