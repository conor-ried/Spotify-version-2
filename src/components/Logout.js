import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logoutUser } from '../redux/actions/authActions';
import { Navigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");  // Clear token from local storage
    dispatch(logoutUser());            // Clear authentication state in Redux
  }, [dispatch]);

  return <Navigate to="/login" />;
}

export default Logout;