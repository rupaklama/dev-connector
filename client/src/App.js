import { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import './App.css';

import store from './store';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { getAuthUserAction, LOGOUT } from './actions/authAction';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/create-profile/ProfileForm';
import EditProfile from './components/create-profile/EditProfile';
import AddExperience from './components/create-profile/AddExperience';
import AddEducation from './components/create-profile/AddEducation';
import Profiles from './components/profiles/Profiles';

const App = () => {
  useEffect(() => {
    // if we have a token in local storage, we always want to sent that
    if (localStorage.token) {
      // if token put it in Global Header 'x-auth-token'
      // func to set persist authentication
      setAuthToken(localStorage.token);
    }

    // When our React App Boots up, we are going to make sure that our App Component
    // calls an Action Creator & this Action Creator is responsible for making
    // an API Request to our Backend to find out if Current User is logged in or not
    store.dispatch(getAuthUserAction()); // get authenticated user

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Fragment>
      <Navbar />
      <section className='container'>
        <Alert />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profiles' component={Profiles} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={ProfileForm} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default App;
