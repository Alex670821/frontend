// src/components/StarRating.js
import React, { useState, useEffect } from 'react';
import '../styles/StarRating.css';  // Importar los estilos CSS

const StarRating = ({ directoId, initialRating }) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (newRating) => {
    setRating(newRating);
    // Aquí realizamos la solicitud al backend para actualizar la calificación
    fetch('http://127.0.0.1:8000/directos/update-rating/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ directo_id: directoId, rating: newRating })
    }).then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          console.log('Rating updated successfully:', data.rating);
        } else {
          console.error('Error updating rating:', data.message);
        }
      });
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'selected' : ''}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
