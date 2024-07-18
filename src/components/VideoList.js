import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/VideoList.css"; // Archivo CSS para estilos personalizados

const VideoList = ({ token }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const accessToken = localStorage.getItem("access");

        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8000/api/videos/",
          config
        );

        const uniqueVideos = response.data.filter(
          (video, index, self) =>
            index === self.findIndex((v) => v.id === video.id)
        );

        setVideos(uniqueVideos);
      } catch (error) {
        if (error.response) {
          console.error("Error:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      }
    };

    fetchVideos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Mostrar tres videos por slide
    slidesToScroll: 1, // Desplazar un video por vez
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="video-list-container">
      <h2>Video List</h2>
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.id}>
            <div className="video-card">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <video width="100%" height="auto" controls>
                <source src={video.video_file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(VideoList);
