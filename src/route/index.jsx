import { createBrowserRouter } from "react-router-dom";
import RedirectifLogged from "../features/authentication/component/RedirectifLogged";
// import LoginPage from "../pages/LoginPage";
// import HomePage from "../pages/HomePage";

// ใช้ lazy
import { lazy } from "react";
import { RouterProvider } from "react-router-dom";
import ProtectedRoute from "../features/authentication/component/ProtectedRoute";
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const MainContainer = lazy(() => import("../layouts/MainContainer"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainContainer />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "profile", element: <h1>Profile</h1> },
    ],
  },
  {
    path: "/login",
    element: (
      <RedirectifLogged>
        <LoginPage />
      </RedirectifLogged>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
