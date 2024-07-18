import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const ViewLiveStream = ({ match }) => {
  const [imageData, setImageData] = useState(null);
  const socket = useRef(null);
  const { id } = match.params;

  useEffect(() => {
    socket.current = io('http://localhost:3004');
    socket.current.emit('joinStream', id);

    socket.current.on('stream', (data) => {
      setImageData(data);
    });

    socket.current.on('endStream', () => {
      setImageData(null);
      alert('The stream has ended.');
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [id]);

  return (
    <div>
      {imageData ? (
        <img src={imageData} alt="Live stream" style={{ width: '100%' }} />
      ) : (
        <p>Loading stream...</p>
      )}
    </div>
  );
};

export default ViewLiveStream;
