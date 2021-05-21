import { AUTH_ERROR, GET_USER, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/authAction';

const initialState = {
  // fetching token if its available in local storage
  token: localStorage.getItem('token'),

  isAuthenticated: null,
  loading: true,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
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
      // removing from local storage
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    // auth user
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    default:
      return state;
  }
};
