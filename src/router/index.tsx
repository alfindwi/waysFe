import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Home } from "../features/app/userPage/home/home";
import { LoginForm } from "../features/auth/login/login";
import { RegisterForm } from "../features/auth/register/register";
import { Detail } from "../features/app/userPage/detailProduct/detailProduct";
import { Cart } from "../features/app/userPage/cart/cart";
import { Checkout } from "../features/app/userPage/checkout/checkout";
import { Profile } from "../features/app/userPage/profile/profile";
import { ProductAdmin } from "../features/app/adminPage/addProduct/productAdmin";
import { TransactionAdmin } from "../features/app/adminPage/transaction/transaction";
import Cookies from "js-cookie";
import RootLayout from "../layouts/rootLayout";
import AuthLayout from "../layouts/authLayout";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRole,
}) => {
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRole.includes(userRole || "")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "detail/:id", element: <Detail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
    ],
  },

  {
    path: "/admin/product",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <ProductAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <TransactionAdmin />
      </ProtectedRoute>
    ),
  },
];

export default function Router() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}
