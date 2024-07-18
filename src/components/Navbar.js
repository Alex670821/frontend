import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import useSubscriptionStatus from "../hooks/SubscriptionStatus";
import CreateStreamForm from "./CreateStreamForm";
import io from "socket.io-client";

const Navbar = ({ isAuthenticated, logout }) => {
  const [redirect, setRedirect] = useState(false);
  const isActiveSubscription = useSubscriptionStatus(isAuthenticated);
  const [streaming, setStreaming] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentStream, setCurrentStream] = useState(null); // State to store current stream data
  const [menuOpen, setMenuOpen] = useState(false); // State to control mobile menu open/close
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3004");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (streaming) {
      startStream();
    } else {
      stopStream();
    }
  }, [streaming]);

  const logoutUser = () => {
    logout();
    setRedirect(true);
  };

  const handleStartStream = () => {
    setStreaming(true);
    setShowCreateForm(false);
  };

  const startStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = document.getElementById("video");
        if (videoElement) {
          videoElement.srcObject = stream;
          setVideoStream(stream);
        }
        const context = canvasRef.current.getContext("2d");
        setInterval(() => {
          context.drawImage(
            videoRef.current,
            0,
            0,
            context.width,
            context.height
          );
          socket.emit("stream", canvasRef.current.toDataURL("image/webp"));
        }, 30);
      })
      .catch((error) => {
        console.error("Error accessing camera: ", error);
        setVideoError(
          "Error accessing camera. Please allow camera access to start streaming."
        );
      });
  };

  const stopStream = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
  };

  const handleStreamCreated = (streamData) => {
    setCurrentStream(streamData);
  };

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
        <Fragment>
          <li className="nav-item">
            <a
              className="nav-link d-flex align-items-center"
              href="#!"
              onClick={() => setShowCreateForm(true)}
            >
              <i className="fas fa-video pe-2"></i> Create Stream
            </a>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link d-flex align-items-center"
              to="/view-streams"
            >
              <i className="fas fa-video pe-2"></i> View Streams
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <i
                className="fas fa-crown"
                style={{ color: "gold", fontSize: "24px", marginLeft: "30px" }}
              ></i>
            </span>
          </li>
        </Fragment>
      )}
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-3">
              <li className="nav-item">
                <Link
                  className="nav-link active d-flex align-items-center"
                  to="#!"
                >
                  <i className="fas fa-bars pe-2"></i> Menu
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
      {videoError && <p>{videoError}</p>}
      <div>
        <video
          id="video"
          ref={videoRef}
          style={{ width: "100%", maxHeight: "500px" }}
          autoPlay
          muted
        ></video>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width="512"
          height="384"
        ></canvas>
      </div>
      {currentStream && (
        <div className="container mt-4">
          <h2>Stream Details</h2>
          <p>Title: {currentStream.title}</p>
          <p>Category: {currentStream.category}</p>
          <video controls style={{ width: "100%", maxHeight: "500px" }}>
            <source src={currentStream.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {showCreateForm && (
        <CreateStreamForm
          setShowCreateForm={setShowCreateForm}
          startStream={handleStartStream}
          userId={localStorage.getItem("userId")}
          onStreamCreated={handleStreamCreated}
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
