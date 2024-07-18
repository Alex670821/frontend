// src/containers/ViewDirecto.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/ViewDirecto.css';  // Importar los estilos CSS para ViewDirecto
import Chat from '../components/Chat';
import StarRating from '../components/StarRating';  // Importar el componente StarRating

const ViewDirecto = () => {
  const location = useLocation();
  const { directo } = location.state || {};
  const userEmail = "jhonjimenez.1257@gmail.com"; // Reemplazar por el email del usuario registrado

  const convertToEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  };

  if (!directo) {
    return <div>No directo selected</div>;
  }

  return (
    <div className="view-directo-container">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Back to Home</Link>
      </nav>
      <div className="content">
        <div className="video-content">
          <h2>{directo.title}</h2>
          <p>{directo.description}</p>
          <iframe
            title={`video-${directo.id}`}
            width="100%"
            height="480"
            src={convertToEmbedUrl(directo.video_url)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <StarRating directoId={directo.id} />  {/* Usa el componente StarRating */}
        </div>
        <div className="chat-content">
          <Chat directoId={directo.id} userEmail={userEmail} />
        </div>
      </div>
    </div>
  );
};

export default ViewDirecto;
