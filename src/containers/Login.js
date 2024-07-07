import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`);
            window.location.replace(res.data.authorization_url);
        } catch (err) {
            console.error('Error with Google login:', err);
        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`);
            window.location.replace(res.data.authorization_url);
        } catch (err) {
            console.error('Error with Facebook login:', err);
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <form onSubmit={onSubmit}>
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input
                                type='email'
                                id='email'
                                className='form-control'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                            <label className='form-label' htmlFor='email'>Email address</label>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                            <input
                                type='password'
                                id='password'
                                className='form-control'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                            <label className='form-label' htmlFor='password'>Password</label>
                        </div>

                        <div className='row mb-4'>
                            <div className='col d-flex justify-content-center'>
                                <div className='form-check'>
                                    <input
                                        className='form-check-input'
                                        type='checkbox'
                                        value=''
                                        id='rememberMe'
                                        checked
                                    />
                                    <label className='form-check-label' htmlFor='rememberMe'> Remember me </label>
                                </div>
                            </div>

                            <div className='col'>
                                <Link to='/reset-password'>Forgot password?</Link>
                            </div>
                        </div>

                        <button data-mdb-ripple-init type='submit' className='btn btn-primary btn-block mb-4'>Sign in</button>

                        <div className='text-center'>
                            <p>Not a member? <Link to='/signup'>Register</Link></p>
                            <p>or sign up with:</p>
                            <button data-mdb-ripple-init type='button' className='btn btn-secondary btn-floating mx-1' onClick={continueWithFacebook}>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </button>

                            <button data-mdb-ripple-init type='button' className='btn btn-secondary btn-floating mx-1' onClick={continueWithGoogle}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>

                            <button data-mdb-ripple-init type='button' className='btn btn-secondary btn-floating mx-1'>
                                <FontAwesomeIcon icon={faGithub} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
