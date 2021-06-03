import React, { Fragment, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileByIdAction } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = () => {
  // const { params } = useRouteMatch();
  const { id } = useParams();

  const dispatch = useDispatch();

  const { profile } = useSelector(state => state.profile);
  const { isAuthenticated, loading, user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getProfileByIdAction(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>

          {/* show edit button if profile belongs to the current user */}
          {isAuthenticated && loading === false && user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>
              Edit Profile
            </Link>
          )}

          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
