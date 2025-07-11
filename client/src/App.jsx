import { createBrowserRouter,createHashRouter, Navigate, RouterProvider } from "react-router-dom";
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
import AddStudents from "./pages/educator/AddStudents";
import Leaderboard from "./pages/Leaderboard";

// Educator routes
const educatorRoutes = {
  path: "educator",
  element: <EducatorLayout />,
  children: [
    { path: "dashboard", element: <EducatorDashboard /> },
    { path: "profile", element: <EducatorProfile /> },
    { path: "add-data", element: <AddData /> },
    { path: "add-students", element: <AddStudents /> },
    { path: "leaderboard", element: <Leaderboard /> }, 
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
    { path: "leaderboard", element: <Leaderboard /> },
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

// Public routes (Landing and About Us)
const publicRoutes = {
  element: <RootLayout />,
  children: [
    { path: "/", element: <LandingPage /> },
    { path: "/about", element: <AboutUs /> },
    { path: "/leaderboard", element: <Leaderboard /> },
  ],
};

// Root router configuration
const router = createHashRouter([
  publicRoutes,
  authRoutes,
  educatorRoutes,
  studentRoutes,
  {
    path: "*",
    element: <NotFound />,
  }
],{
  basename: "/Eduportal"
}
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
