import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const AuthLayout = () => {
  const authState = useAppSelector((state) => state.auth);

  if (!authState.token) {
    return <Outlet />;
  }

  if (authState.user?.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  if (authState.user?.role === "USER") {
    return <Navigate to="/" replace />;
  }
};

export default AuthLayout;
