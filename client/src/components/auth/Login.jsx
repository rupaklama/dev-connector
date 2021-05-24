import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginAction } from '../../actions/authAction';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(state => state.auth);

  // destructuring properties
  const { email, password } = formData;

  // name attrib is to refer to the Input element
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    dispatch(loginAction(email, password));

    setFormData({ email: '', password: '' });
  };

  // redirect user after logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>

      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>

      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            // required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            name='password'
            // minLength='6'
            value={password}
            onChange={onChange}
            // required
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>

      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
