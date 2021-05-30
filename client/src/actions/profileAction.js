import api from '../utils/api';
import { setAlertAction } from './alertAction';

export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';
export const GET_REPOS = 'GET_REPOS';
export const NO_REPOS = 'NO_REPOS';

// get current user's profile
export const getCurrentProfileAction = () => async dispatch => {
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
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfilesAction = () => async dispatch => {
  // clearing single user profile to avoid like flashing past user profile
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileByIdAction = userId => async dispatch => {
  try {
    const res = await api.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos
export const getGithubReposAction = username => async dispatch => {
  try {
    const res = await api.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
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

// add experience
export const addExperienceAction = (formData, history) => async dispatch => {
  try {
    const res = await api.put('/api/profile/experience', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // set an alert
    dispatch(setAlertAction('Experience Added', 'success'));

    history.push('/dashboard');
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

// add education
export const addEducationAction = (formData, history) => async dispatch => {
  try {
    const res = await api.put('/api/profile/education', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // set an alert
    dispatch(setAlertAction('Education Added', 'success'));

    history.push('/dashboard');
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

// delete experience
export const deleteExperienceAction = id => async dispatch => {
  try {
    const res = await api.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlertAction('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete education
export const deleteEducationAction = id => async dispatch => {
  try {
    const res = await api.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlertAction('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete account
export const deleteAccountAction = () => async dispatch => {
  // window.confirm() instructs the browser to display a dialog with an optional message,
  // and to wait until the user either confirms or cancels the dialog
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/api/profile');

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(
        setAlertAction('Your account has been permanently deleted. Sorry, to see you go :(', 'success')
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
