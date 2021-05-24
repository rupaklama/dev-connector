import api from '../utils/api';

export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';

// get current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await api.get('/api/profile/me');
    console.log(res.data);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }, // OK 200
    });
  }
};
