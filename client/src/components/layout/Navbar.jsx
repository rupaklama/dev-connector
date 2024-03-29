import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../actions/authAction';

const Navbar = () => {
  const dispatch = useDispatch();

  const authState = useSelector(state => state.auth);
  const { isAuthenticated, loading } = authState;

  const onClick = () => dispatch(logoutAction());

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' /> <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='#!' onClick={onClick}>
          <i className='fas fa-sign-out-alt' /> <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>

      {/* done loading 'loading: false' */}
      {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
    </nav>
  );
};

export default Navbar;
