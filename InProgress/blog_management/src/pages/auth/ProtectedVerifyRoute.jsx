import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedVerifyRoute = () => {
  const location = useLocation();

  // Only allow access if email exists in location.state
  if (location.state?.email) {
    return <Outlet />;
  } else {
    return <Navigate to="/error/404" replace />;
  }
};

export default ProtectedVerifyRoute;
