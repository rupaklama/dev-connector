import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccountAction, getCurrentProfileAction } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const { loading, profile } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfileAction());
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
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => dispatch(deleteAccountAction())}>
              <i className='fas fa-user' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => dispatch(deleteAccountAction())}>
              <i className='fas fa-user' /> Delete My Account
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
