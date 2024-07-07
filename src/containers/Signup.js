import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faGithub, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`);

            window.location.replace(res.data.authorization_url);
        } catch (err) {
            console.error(err);
        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`);

            window.location.replace(res.data.authorization_url);
        } catch (err) {
            console.error(err);
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    if (accountCreated) {
        return <Redirect to='/login' />;
    }

    return (
        <div className='container mt-5'>
            <div className='card'>
                <h3 className='card-header'>Sign Up</h3>
                <div className='card-body'>
                    <form onSubmit={onSubmit}>
                        <div className='row mb-3'>
                            <div className='col'>
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='form3Example1'
                                        className='form-control'
                                        placeholder='First Name*'
                                        name='first_name'
                                        value={first_name}
                                        onChange={onChange}
                                        required
                                    />
                                    <label className='form-label' htmlFor='form3Example1'>
                                        First name
                                    </label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='form3Example2'
                                        className='form-control'
                                        placeholder='Last Name*'
                                        name='last_name'
                                        value={last_name}
                                        onChange={onChange}
                                        required
                                    />
                                    <label className='form-label' htmlFor='form3Example2'>
                                        Last name
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='form-outline mb-3'>
                            <input
                                type='email'
                                id='form3Example3'
                                className='form-control'
                                placeholder='Email*'
                                name='email'
                                value={email}
                                onChange={onChange}
                                required
                            />
                            <label className='form-label' htmlFor='form3Example3'>
                                Email address
                            </label>
                        </div>

                        <div className='form-outline mb-3'>
                            <input
                                type='password'
                                id='form3Example4'
                                className='form-control'
                                placeholder='Password*'
                                name='password'
                                value={password}
                                onChange={onChange}
                                minLength='6'
                                required
                            />
                            <label className='form-label' htmlFor='form3Example4'>
                                Password
                            </label>
                        </div>

                        <div className='form-outline mb-3'>
                            <input
                                type='password'
                                id='form3Example5'
                                className='form-control'
                                placeholder='Confirm Password*'
                                name='re_password'
                                value={re_password}
                                onChange={onChange}
                                minLength='6'
                                required
                            />
                            <label className='form-label' htmlFor='form3Example5'>
                                Confirm Password
                            </label>
                        </div>

                        <div className='form-check mb-3'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                value=''
                                id='form2Example33'
                                defaultChecked
                            />
                            <label className='form-check-label' htmlFor='form2Example33'>
                                Subscribe to our newsletter
                            </label>
                        </div>

                        <button type='submit' className='btn btn-primary btn-block'>
                            Register
                        </button>
                    </form>
                </div>
                <div className='card-footer text-center'>
                    <p>or sign up with:</p>
                    <button className='btn btn-secondary btn-floating mx-1'>
                    <FontAwesomeIcon icon={faFacebook} />
                    </button>

                    <button className='btn btn-secondary btn-floating mx-1'>
                    <FontAwesomeIcon icon={faGoogle} />
                    </button>

                    <button className='btn btn-secondary btn-floating mx-1'>
                    <FontAwesomeIcon icon={faTwitter} />
                    </button>

                    <button className='btn btn-secondary btn-floating mx-1'>
                    <FontAwesomeIcon icon={faGithub} />
                    </button>
                </div>
                <div className='card-footer text-center'>
                    <p>
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
