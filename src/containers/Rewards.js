import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Rewards.css'; // Create this file for additional styling

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/rewards/rewards/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
        });
        setRewards(response.data);
      } catch (err) {
        console.error('Error fetching rewards:', err);
      }
    };

    const fetchUserPoints = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/auth/users/me/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
        });
        setPoints(response.data.points.points);
      } catch (err) {
        console.error('Error fetching user points:', err);
      }
    };

    fetchRewards();
    fetchUserPoints();
  }, []);

  const redeemReward = async (rewardId, pointsCost) => {
    if (points >= pointsCost) {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/rewards/rewards/${rewardId}/redeem/`, {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
        });
        if (response.status === 200) {
          setPoints(points - pointsCost);
        }
      } catch (err) {
        console.error('Error redeeming reward:', err);
      }
    } else {
      alert('No tienes suficientes puntos para canjear este premio.');
    }
  };

  return (
    <div className="rewards-container">
      <h1>Canjea tus Puntos</h1>
      <p>Total de puntos: {points}</p>
      <div className="rewards-list">
        {rewards.map(reward => (
          <div key={reward.id} className="reward-card">
            <img src={`http://127.0.0.1:8000${reward.image}`} alt={reward.name} className="reward-image" />
            <h2>{reward.name}</h2>
            <p>{reward.description}</p>
            <p>Cost: {reward.points_cost} puntos</p>
            <button onClick={() => redeemReward(reward.id, reward.points_cost)}>
              Canjear
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
