// src/containers/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import '../styles/Profile.css'; // Create this file for additional styling

const Profile = () => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        profile_picture: null,
    });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [preview, setPreview] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/profile/`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Cambia 'JWT' por 'Bearer'
                    }
                });
                setFormData({
                    email: response.data.email,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    profile_picture: response.data.profile_picture,
                });
                if (response.data.profile_picture) {
                    setPreview(`${process.env.REACT_APP_API_URL}${response.data.profile_picture}`);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUserData();
    }, []);

    const { email, first_name, last_name, profile_picture } = formData;

    const onChange = e => {
        if (e.target.name === 'profile_picture') {
            const file = e.target.files[0];
            setFormData({ ...formData, [e.target.name]: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('email', email);
        formDataToSend.append('first_name', first_name);
        formDataToSend.append('last_name', last_name);
        if (profile_picture) {
            formDataToSend.append('profile_picture', profile_picture);
        }
        try {
            const token = localStorage.getItem('access');
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/accounts/profile/`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Cambia 'JWT' por 'Bearer'
                }
            });
            console.log('Profile updated:', response.data);
            setPreview(`${process.env.REACT_APP_API_URL}${response.data.profile_picture}`); // Update preview after successful update
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const onPasswordChange = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access');
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/change_password/`, {
                old_password: oldPassword,
                new_password: newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Cambia 'JWT' por 'Bearer'
                }
            });
            console.log('Password updated:', response.data);
        } catch (err) {
            console.error('Error changing password:', err);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');  // Redirigir al home después del logout
    };

    return (
        <div className="profile-container">
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
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h2>Profile</h2>
                            <form onSubmit={onSubmit}>
                                <div className="row mb-4">
                                    <div className="col">
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="form6Example1"
                                                className="form-control"
                                                name="first_name"
                                                value={first_name}
                                                onChange={onChange}
                                                required
                                            />
                                            <label className="form-label" htmlFor="form6Example1">First name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="form6Example2"
                                                className="form-control"
                                                name="last_name"
                                                value={last_name}
                                                onChange={onChange}
                                                required
                                            />
                                            <label className="form-label" htmlFor="form6Example2">Last name</label>
                                        </div>
                                    </div>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form6Example5"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form6Example5">Email</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="profile_picture"
                                        onChange={onChange}
                                    />
                                    <label className="form-label" htmlFor="form6Example6">Profile Picture</label>
                                    {preview && (
                                        <div>
                                            <img src={preview} alt="Profile Preview" style={{ width: '200px', marginTop: '10px' }} />
                                        </div>
                                    )}
                                </div>

                                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4">Update Profile</button>
                            </form>

                            <h2>Change Password</h2>
                            <form onSubmit={onPasswordChange}>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form6Example6"
                                        className="form-control"
                                        value={oldPassword}
                                        onChange={e => setOldPassword(e.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form6Example6">Old Password</label>
                                </div>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form6Example7"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form6Example7">New Password</label>
                                </div>
                                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4">Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
