import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = () => {
  const { loading, profile } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  // if loading and profile is null
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user?.name}
      </p>

      {/* if user has profile - not null */}
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
