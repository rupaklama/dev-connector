// import axios from 'axios';
import React, { Fragment, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlertAction } from '../../actions/alertAction';
import { registerAction } from '../../actions/authAction';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const dispatch = useDispatch();

  // destructuring properties
  const { name, email, password, password2 } = formData;

  // name attrib is to refer to the Input element
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      dispatch(setAlertAction('Password do not match', 'danger'));
    } else {
      dispatch(registerAction({ name, email, password }));
    }

    // if (password !== password2) {
    //   console.log('Password do not match');
    // } else {
    //   const newUser = {
    //     name,
    //     email,
    //     password,
    //   };

    //   try {
    //     const config = {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     };

    //     // JSON. parse() takes a JSON string and transforms it into a JavaScript object.
    //     // stringify() takes a JavaScript object and transforms it into a JSON string
    //     const body = JSON.stringify(newUser);

    //     const res = await axios.post('/api/users', body, config);
    //     console.log(res.data);
    //   } catch (err) {
    //     console.error(err.response.data);
    //   }
    // }

    setFormData({ name: '', email: '', password: '', password2: '' });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>

      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>

      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
            // required
          />
        </div>
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
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
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
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            id='password2'
            placeholder='Confirm Password'
            name='password2'
            // minLength='6'
            value={password2}
            onChange={onChange}
            // required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>

      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

// since using useDispatch hook
// Register.propTypes = {
//   setAlertAction: PropTypes.func.isRequired,
// };

export default Register;
