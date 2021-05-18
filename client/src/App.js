import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />

      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default App;
