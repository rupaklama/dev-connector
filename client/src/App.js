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
import { getAuthUserAction } from './actions/authAction';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/create-profile/ProfileForm';
import EditProfile from './components/create-profile/EditProfile';
import AddExperience from './components/create-profile/AddExperience';
import AddEducation from './components/create-profile/AddEducation';

const App = () => {
  useEffect(() => {
    // if we have a token in local storage, we always want to sent that
    if (localStorage.token) {
      // if token put it in Global Header 'x-auth-token'
      // func to set persist authentication
      setAuthToken(localStorage.token);
    }

    // accessing Store directly to dispatch loadUserAction
    store.dispatch(getAuthUserAction()); // get authenticated user
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
