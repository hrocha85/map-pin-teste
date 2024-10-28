import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/localStorage";

const PublicRoutes = () => {
  const user = isLoggedIn();
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoutes;
