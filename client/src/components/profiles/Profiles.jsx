import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfilesAction } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
  const { profiles, loading } = useSelector(state => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfilesAction());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with developers
          </p>

          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
