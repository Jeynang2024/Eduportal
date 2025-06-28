import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";
import EducatorLayout from "./layouts/EducatorLayout";
import StudentLayout from "./layouts/StudentLayout";
import Login from "./pages/Login";
import RegisterEducator from "./pages/RegisterEducator";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import LandingPage from "./pages/LandingPage";
import EducatorDashboard from "./pages/educator/EducatorDashboard";
import EducatorProfile from "./pages/educator/EducatorProfile";
import AddData from "./pages/educator/AddData";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import Scholarships from "./pages/student/Scholarships";

// Educator routes
const educatorRoutes = {
  path: "educator",
  element: <EducatorLayout />,
  children: [
    { path: "dashboard", element: <EducatorDashboard /> },
    { path: "profile", element: <EducatorProfile /> },
    { path: "add-data", element: <AddData /> },
  ],
};

// Student routes
const studentRoutes = {
  path: "student",
  element: <StudentLayout />,
  children: [
    { path: "dashboard", element: <StudentDashboard /> },
    { path: "profile", element: <StudentProfile /> },
    { path: "scholarships", element: <Scholarships /> },
  ],
};

// Auth routes (public)
const authRoutes = {
  path: "auth",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <Login /> },
    { path: "register-educator", element: <RegisterEducator /> },
  ],
};

// Root router configuration
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <AboutUs /> },
      authRoutes,
      educatorRoutes,
      studentRoutes,
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
