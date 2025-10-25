import { isLoggedIn, isValidRole } from '../../utils/routeGuard';
import { Navigate } from 'react-router';

const AuthRoute = ({ children, allowedRoles }) => {
  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/auth/login"
        state={{ warn: 'Please log in first !!!' }}
        replace
      />
    );
  }

  if (!isValidRole(allowedRoles)) {
    return (
      <Navigate
        to="/auth/login"
        state={{ warn: 'You are not authorized. Please sign in as admin to continue' }}
        replace
      />
    );
  }

  return children;
};

export default AuthRoute;
