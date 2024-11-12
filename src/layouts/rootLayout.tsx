import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const RootLayout = () => {
   const authState = useAppSelector((state) => state.auth);

   if (!authState.token) {
      return <Navigate to="/login" replace />;
   }

   return ( <Outlet /> );
};

export default RootLayout;
