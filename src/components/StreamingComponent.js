// StreamingComponent.js

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const StreamingComponent = () => {
  const [streaming, setStreaming] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3004", {
      transports: ["websocket", "polling"],
    });
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

  return (
    <div>
      <button onClick={() => setStreaming(!streaming)}>
        {streaming ? "Stop Streaming" : "Start Streaming"}
      </button>
      {videoError && <p>{videoError}</p>}
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
  );
};

export default StreamingComponent;
