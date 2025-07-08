import React, { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../services/authService";
import { useUser } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateUserState } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login({ username, password });
    setLoading(false);
    if (res.success) {
       console.log("Login response:", res);
      toast.success("Login successful!");
      // Decode token from cookie (need to fetch it)
      //const token = getCookie("accessToken");
      const token = res.token;
      // after login
localStorage.setItem("token", res.token);

    console.log("Token:", token);

      if (token) {
        const decoded = jwtDecode(token);
        updateUserState({
          userRole: decoded.role,
          userId: decoded.id,
        });
        // Redirect based on role
        if (decoded.role === "educator") {
          navigate("/educator/dashboard");
        } else if (decoded.role === "student") {
          navigate("/student/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Token not found");
      }
    } else {
      toast.error("Invalid credentials");
    }
  };

  // Helper to get cookie value
  function getCookie(name) {
   const cookie = Cookies.get(name);

    // const cookies = document.cookie.split(";").map((c) => c.trim());
    // for (const cookie of cookies) {
    //   if (cookie.startsWith(name + "=")) {
    //     return cookie.substring(name.length + 1);
    //   }
    // }
    // return null;
    return cookie
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Login
        </h2>
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
