// frontend/src/actions/auth.js

import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GET_POINTS_SUCCESS,
    GET_POINTS_FAIL
} from './types';

// Function to get the CSRF token from cookies
const getCSRFToken = () => {
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(cookie => {
            const csrf = cookie.trim().split('=');
            if (csrf[0] === 'csrftoken') {
                csrfToken = decodeURIComponent(csrf[1]);
            }
        });
    }
    return csrfToken;
};

export const load_user = () => async dispatch => {
    const token = localStorage.getItem('access');
    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });

            dispatch(getUserPoints());
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const checkAuthenticated = () => async dispatch => {
    const token = localStorage.getItem('access');
    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
};

export const reset_password = email => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = (points) => async dispatch => {
    try {
        const token = localStorage.getItem('access');
        const csrfToken = getCSRFToken();
        await axios.post(`${process.env.REACT_APP_API_URL}/accounts/logout_and_save_points/`, { points }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-CSRFToken': csrfToken
            }
        });
        dispatch({
            type: LOGOUT
        });
    } catch (err) {
        console.error('Error updating points:', err);
        dispatch({
            type: LOGOUT
        });
    }
};

export const getUserPoints = () => async dispatch => {
    const token = localStorage.getItem('access');
    if (token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user_points/`, config);

            dispatch({
                type: GET_POINTS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_POINTS_FAIL
            });
        }
    } else {
        dispatch({
            type: GET_POINTS_FAIL
        });
    }
};

export const updateUserPoints = () => async dispatch => {
    const token = localStorage.getItem('access');
    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/update_points/`, null, config);

            dispatch({
                type: GET_POINTS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_POINTS_FAIL
            });
        }
    } else {
        dispatch({
            type: GET_POINTS_FAIL
        });
    }
};
