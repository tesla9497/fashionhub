import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import MainLayout from "../components/layout/MainLayout";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProductList from "../pages/ProductList";
import { Profile } from "../pages/Profile";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import UserLists from "../components/custom/UserLists";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profile",
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: "/my-lists",
            element: (
              <ProtectedRoute>
                <UserLists />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
