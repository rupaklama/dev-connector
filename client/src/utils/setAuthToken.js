import api from './api';

// need to check to see if there's a token &
// if we have a token in local storage, we always want to sent that.
// if token put it in Global Header 'x-auth-token'

// function takes in a 'token' if token is there in a local storage
// it will add to the header, if not it will delete from the header
const setAuthToken = token => {
  if (token) {
    // setting it to the token pass in above param
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    // if not a token delete it to clear the local storage
    // When we have a token, we are going to send it with Every Request instead
    // of picking and choosing which Request to send it with
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
