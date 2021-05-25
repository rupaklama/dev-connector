import api from '../utils/api';
import { setAlertAction } from './alertAction';

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

// create or update profile
// history object - to redirect after submitting the form with history.push()
// edit - editing/updating
export const createProfileAction =
  (formData, history, edit = false) =>
  async dispatch => {
    try {
      const res = await api.post('/api/profile', formData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      // set an alert for profile has been updated or created
      dispatch(setAlertAction(edit ? 'Profile updated' : 'Profile Created!', 'success'));

      // if editing, stay on the same page
      // if not editing, redirect
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlertAction(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
