import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';
// import setAuthToken from '../utils/setAuthToken';
import { setAlertAction } from './alertAction'; // token failed

// after user logs out
import { CLEAR_PROFILE } from './profileAction';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const GET_USER = 'GET_USER'; // auth user
export const AUTH_ERROR = 'AUTH_ERROR';

// NOTE - we need to run this action creator when our initial app loads for token data persistence
// When our React App Boots up, we are going to make sure that our App Component
// calls an Action Creator & this Action Creator is responsible for making
// an API Request to our Backend to find out if Current User is logged in or not
export const getAuthUserAction = () => async dispatch => {
  // if we have a token in local storage, we always want to sent that
  if (localStorage.token) {
    // if token put it in Global Header 'x-auth-token'
    // func to set persist authentication
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get('/api/auth');

    dispatch({
      type: GET_USER,
      payload: res.data, // token
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// register user
export const registerAction =
  ({ name, email, password }) =>
  async dispatch => {
    try {
      const res = await api.post('/api/users', { name, email, password });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // to get current auth user
      dispatch(getAuthUserAction());
    } catch (err) {
      // since we are getting array of errors from our backend
      // array is call 'errors'
      const errors = err.response.data.errors;

      // display errors with setAlertAction creator
      if (errors) {
        errors.forEach(error => dispatch(setAlertAction(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// login user
export const loginAction = (email, password) => async dispatch => {
  try {
    const res = await api.post('/api/auth', { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // to get current auth user
    dispatch(getAuthUserAction());
  } catch (err) {
    // since we are getting array of errors from our backend
    // array is call 'errors'
    const errors = err.response.data.errors;

    // display errors with setAlertAction creator
    if (errors) {
      errors.forEach(error => dispatch(setAlertAction(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout
export const logoutAction = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
