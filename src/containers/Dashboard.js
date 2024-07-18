// src/containers/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import NotificationModal from '../components/NotificationModal';
import axios from 'axios';
import '../styles/NotificationModal.css';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [points, setPoints] = useState(0);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [rewards, setRewards] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClose = () => setShow(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/users/me/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserName(`${data.first_name} ${data.last_name}`);
                setPoints(data.points.points);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

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

        fetchUserData();
        fetchRewards();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(prevPoints => {
                const newPoints = prevPoints + 10;
                setMessage(`Ganaste 10 puntos. Total de puntos: ${newPoints}`);
                setShow(true);
                return newPoints;
            });
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const redeemReward = async (rewardId, pointsCost) => {
        if (points >= pointsCost) {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/rewards/rewards/${rewardId}/redeem/`, {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json'
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

    const handleLogout = () => {
        dispatch(logout(points));
        history.push('/');
    };

    return (
        <div className="dashboard-container">
            <nav className="sidebar">
                <div className="sidebar-header">
                    <h3>Menu</h3>
                </div>
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/messages">Crear Directos</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Puntos</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
            <div className="content">
                <div className="container mt-5">
                    <h1>Puntos</h1>
                    <p>Total de puntos: {points}</p>
                    <div className="rewards-list">
                        {rewards.map(reward => (
                            <div key={reward.id} className="reward-card">
                                <img src={`${reward.image}`} alt={reward.name} className="reward-image" />
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
                <NotificationModal show={show} handleClose={handleClose} message={message} />
            </div>
        </div>
    );
};

export default Dashboard;
