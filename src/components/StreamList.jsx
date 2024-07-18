import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StreamList = () => {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:8000/stream/list-streams/",
          config
        );
        setStreams(response.data);
      } catch (error) {
        console.error("Error fetching streams:", error);
      }
    };

    fetchStreams();
  }, []);

  return (
    <div>
      <h1>Live Streams</h1>
      <ul>
        {streams.map((stream) => (
          <li key={stream.id}>
            <h3>{stream.title}</h3>
            <p>{stream.category}</p>
            <p>By: {stream.user}</p>
            <Link to={`/view/${stream.id}`}>View Stream</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
