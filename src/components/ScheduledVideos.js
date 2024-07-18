import React, { useEffect, useState } from "react";
import axios from "axios";

const ScheduledVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchScheduledVideos = async () => {
      const response = await axios.get("/api/videos/");
      const scheduledVideos = response.data.filter(
        (video) => new Date(video.scheduled_time) > new Date()
      );
      setVideos(scheduledVideos);
    };

    fetchScheduledVideos();
  }, []);

  return (
    <div>
      <h2>Scheduled Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <p>
              Scheduled for: {new Date(video.scheduled_time).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledVideos;
