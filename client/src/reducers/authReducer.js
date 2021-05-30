import {
  AUTH_ERROR,
  GET_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../actions/authAction';
import { ACCOUNT_DELETED } from '../actions/profileAction';

const initialState = {
  // fetching token if its available in local storage
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // auth user
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    // setting response token after register & login
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // set token inside local storage
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload, // token from our local storage
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      // removing from local storage
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
