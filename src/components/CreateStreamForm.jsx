import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

const CreateStreamForm = ({ setShowCreateForm, onStreamCreated }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const videoRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3004");

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.play();

        const captureFrame = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const data = canvas.toDataURL('image/webp');
          socket.current.emit('stream', { streamId: title, data });
          requestAnimationFrame(captureFrame);
        };

        captureFrame();
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [title]);

  const handleCreateStream = async () => {
    try {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      const formData = {
        title,
        category,
      };

      const response = await axios.post('http://localhost:8000/stream/create-stream/', formData, config);
      if (response.status === 201) {
        const data = response.data;
        onStreamCreated(data);
        setShowCreateForm(false);
        socket.current.emit('createStream', title);
      } else {
        console.error('Error creating stream:', response.data);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Directo</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowCreateForm(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Categoría</label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <video ref={videoRef} style={{ display: 'block', width: '100%' }}></video>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowCreateForm(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleCreateStream}
            >
              Ir a Directo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStreamForm;
