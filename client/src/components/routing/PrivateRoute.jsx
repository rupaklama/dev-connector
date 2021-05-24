import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // we need to access Auth state to find out if user is logged in or not,
  // also loading value to figure out if it's done loading or not
  const { loading, isAuthenticated } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      // if user is not authenticated & not loading, redirect to 'login'
      // if user is authenticated, load that particular component
      // render={props => (!isAuthenticated && !loading ? <Redirect to='/login' /> : <Component {...props} />)}
      render={(
        props // render is to pass any props down to the Component
      ) => (loading ? <Spinner /> : isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  );
};

export default PrivateRoute;
