import React from "react";

const StreamCard = ({ stream, videoStream }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{stream.title}</h5>
      </div>
      <div className="card-body">
        <div className="embed-responsive embed-responsive-16by9">
          <video
            className="embed-responsive-item"
            src={videoStream ? URL.createObjectURL(videoStream) : ""}
            autoPlay
            muted
            controls
          ></video>
        </div>
        <p className="card-text">Categoría: {stream.category}</p>
        <p className="card-text">Usuario: {stream.user.username}</p>
      </div>
    </div>
  );
};

export default StreamCard;
