import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

const VideoCarousel = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get("/api/videos/");
      const activeVideos = response.data.filter(
        (video) =>
          video.is_active && new Date(video.scheduled_time) <= new Date()
      );
      setVideos(activeVideos);
    };

    fetchVideos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <video width="320" height="240" controls>
            <source src={video.video_file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </Slider>
  );
};

export default VideoCarousel;
