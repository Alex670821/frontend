import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import useSubscriptionStatus from "../hooks/SubscriptionStatus";
import axios from 'axios';

const Navbar = ({ isAuthenticated, logout }) => {
  const [redirect, setRedirect] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const isActiveSubscription = useSubscriptionStatus(isAuthenticated);

  const logoutUser = () => {
    logout();
    setRedirect(true);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('access');
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/profile/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setProfileImage(`${process.env.REACT_APP_API_URL}${response.data.profile_picture}`);
        } catch (err) {
          console.error('Error fetching profile image:', err);
        }
      }
    };

    fetchProfileImage();
  }, [isAuthenticated]);

  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link d-flex align-items-center me-3" to="/signup">
          <i className="fas fa-bookmark pe-2"></i> Registrarse
        </Link>
      </li>
      <li className="nav-item" style={{ width: "65px" }}>
        <Link className="nav-link d-flex align-items-center" to="/login">
          Sign In
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      {!isActiveSubscription && (
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center" to="/subscribe">
            <i className="fas fa-bookmark pe-2"></i> Suscripción
          </Link>
        </li>
      )}
      {isActiveSubscription && (
        <li className="nav-item">
          <span className="nav-link">
            <i
              className="fas fa-crown"
              style={{ color: "gold", fontSize: "24px", marginLeft: "30px" }}
            ></i>
          </span>
        </li>
      )}
      <li className="nav-item">
        <Link className="nav-link d-flex align-items-center" to="/profile">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          ) : (
            <i className="fas fa-user-circle fa-2x"></i>
          )}
        </Link>
      </li>
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
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-3">
              <li className="nav-item">
                <Link
                  className="nav-link active d-flex align-items-center"
                  to="#!"
                >
                  <i className="fas fa-bars pe-2"></i>Menu
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

            {/* Additional Authenticated Links */}
            {isAuthenticated && (
              <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
                <li className="nav-item text-center mx-2 mx-lg-1">
                  <a className="nav-link" href="#!">
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
                  Home
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
