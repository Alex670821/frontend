import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const VideoUpload = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access");

      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("video_file", videoFile);
      formData.append("is_active", isActive);
      formData.append("scheduled_time", scheduledTime);

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "http://localhost:8000/api/videos/",
        formData,
        config
      );

      // Reset form fields on successful upload
      setTitle("");
      setDescription("");
      setCategory("");
      setVideoFile(null);
      setIsActive(false);
      setScheduledTime("");

      setModalTitle("Success");
      setModalBody("Video uploaded successfully.");
      setModalShow(true);
    } catch (error) {
      let errorMessage = "Error uploading video.";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else {
        errorMessage = error.message || errorMessage;
      }

      setModalTitle("Error");
      setModalBody(errorMessage);
      setModalShow(true);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "auto",
          marginBottom: "5px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="row mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="title">
                Title
              </label>
            </div>
          </div>
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <label className="form-label" htmlFor="description">
            Description
          </label>
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="text"
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <label className="form-label" htmlFor="category">
            Category
          </label>
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="videoFile">
            Video File
          </label>
          <input
            type="file"
            id="videoFile"
            className="form-control"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>
        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isActive">
            Is Active
          </label>
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="datetime-local"
            id="scheduledTime"
            className="form-control"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            required
          />
          <label className="form-label" htmlFor="scheduledTime">
            Scheduled Time
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Upload Video
        </button>
      </form>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(VideoUpload);
