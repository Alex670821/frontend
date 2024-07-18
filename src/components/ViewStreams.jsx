import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewStreams = () => {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await axios.get('http://localhost:8000/stream/');
        setStreams(response.data);
      } catch (error) {
        console.error('Error fetching streams:', error);
      }
    };

    fetchStreams();
  }, []);

  return (
    <div className="container">
      <h1>Streams Disponibles</h1>
      {streams.length > 0 ? (
        <ul className="list-group">
          {streams.map((stream) => (
            <li key={stream.id} className="list-group-item">
              <Link to={`/view-stream/${stream.id}`}>{stream.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay streams disponibles</p>
      )}
    </div>
  );
};

export default ViewStreams;
