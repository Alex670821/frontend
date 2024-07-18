import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const LiveVideoStream = ({ streamId }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3004");

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.play();
      }

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const captureFrame = () => {
        if (video && context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const data = canvas.toDataURL("image/webp");
          socket.current.emit("stream", data);
        }
        requestAnimationFrame(captureFrame);
      };

      captureFrame();

      axios.patch(`http://localhost:8000/streams/${streamId}/start_stream/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      }).then(response => {
        console.log("Stream started:", response.data);
      }).catch(error => {
        console.error("Error starting stream:", error);
      });

      return () => {
        axios.patch(`http://localhost:8000/streams/${streamId}/stop_stream/`, {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          }
        }).then(response => {
          console.log("Stream stopped:", response.data);
        }).catch(error => {
          console.error("Error stopping stream:", error);
        });
        socket.current.disconnect();
      };
    });
  }, [streamId]);

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }}></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }}></canvas>
    </div>
  );
};

export default LiveVideoStream;
