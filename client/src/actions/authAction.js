import api from '../utils/api';
// import setAuthToken from '../utils/setAuthToken';
import { setAlertAction } from './alertAction';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const GET_USER = 'GET_USER'; // auth user
export const AUTH_ERROR = 'AUTH_ERROR'; // token failed

// NOTE - we need to run this action creator when our initial app loads for token data persistence
// get authenticated user
export const getAuthUserAction = () => async dispatch => {
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
