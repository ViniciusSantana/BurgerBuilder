import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyCEkTmLeWQeFgvXxG3a8Yzt4KBxdaeeXjA';
const authStart = () => ({
    type: actionTypes.AUTH_START,
});

const authSuccess = (idToken, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
});
const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error,
});

export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });
const checkAuthTimeout = (expirationTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
};

// eslint-disable-next-line import/prefer-default-export
export const auth = (email, password, isSignUp) => (dispatch) => {
    dispatch(authStart());
    const authData = {
        email,
        password,
        returnSecureToken: true,
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    if (!isSignUp) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }
    axios.post(url, authData)
        .then((response) => {
            console.log(response);
            const { idToken, localId, expiresIn } = response.data;
            dispatch(authSuccess(idToken, localId));
            dispatch(checkAuthTimeout(expiresIn));
        })
        .catch((err) => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
};

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
});
