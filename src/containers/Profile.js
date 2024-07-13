import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/profile/`, {
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`
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
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/accounts/profile/`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/change_password/`, {
                old_password: oldPassword,
                new_password: newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            });
            console.log('Password updated:', response.data);
        } catch (err) {
            console.error('Error changing password:', err);
        }
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
                        <Link to="/messages">En Directo</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Puntos</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </nav>
            <div className="content">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                            data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i className="fas fa-bars text-light"></i>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
                                <li className="nav-item text-center mx-2 mx-lg-1">
                                    <a className="nav-link active" aria-current="page" href="#!">
                                        <div>
                                            <i className="fas fa-home fa-lg mb-1"></i>
                                        </div>
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item text-center mx-2 mx-lg-1">
                                    <a className="nav-link" href="#!">
                                        <div>
                                            <i className="far fa-envelope fa-lg mb-1"></i>
                                            <span className="badge rounded-pill badge-notification bg-danger">11</span>
                                        </div>
                                        Link
                                    </a>
                                </li>
                                <li className="nav-item text-center mx-2 mx-lg-1">
                                    <a className="nav-link disabled" aria-disabled="true" href="#!">
                                        <div>
                                            <i className="far fa-envelope fa-lg mb-1"></i>
                                            <span className="badge rounded-pill badge-notification bg-warning">11</span>
                                        </div>
                                        Disabled
                                    </a>
                                </li>
                                <li className="nav-item dropdown text-center mx-2 mx-lg-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                        data-mdb-toggle="dropdown" aria-expanded="false">
                                        <div>
                                            <i className="far fa-envelope fa-lg mb-1"></i>
                                            <span className="badge rounded-pill badge-notification bg-primary">11</span>
                                        </div>
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>

                            <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
                                <li className="nav-item text-center mx-2 mx-lg-1">
                                    <a className="nav-link" href="#!">
                                        <div>
                                            <i className="fas fa-bell fa-lg mb-1"></i>
                                            <span className="badge rounded-pill badge-notification bg-info">11</span>
                                        </div>
                                        Messages
                                    </a>
                                </li>
                                <li className="nav-item text-center mx-2 mx-lg-1">
                                    <a className="nav-link" href="#!">
                                        <div>
                                            <i className="fas fa-globe-americas fa-lg mb-1"></i>
                                            <span className="badge rounded-pill badge-notification bg-success">11</span>
                                        </div>
                                        News
                                    </a>
                                </li>
                            </ul>

                            <form className="d-flex input-group w-auto ms-lg-3 my-3 my-lg-0">
                                <input type="search" className="form-control" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-primary" type="button" data-mdb-ripple-color="dark">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
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
