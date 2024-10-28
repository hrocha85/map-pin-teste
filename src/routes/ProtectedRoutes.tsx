import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/localStorage";

const ProtectedRoutes = () => {
  const user = isLoggedIn();
  return user ? <Outlet /> : <Navigate to="sign-in" />;
};

export default ProtectedRoutes;
