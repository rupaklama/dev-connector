import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return <div>Dashboard</div>;
};

export default Dashboard;
