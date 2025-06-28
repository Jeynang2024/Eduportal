import React, { useState } from "react";
import toast from "react-hot-toast";
import { registerEducator } from "../services/authService";

const RegisterEducator = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    qualification: "",
    contact: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    await registerEducator(form);
    setLoading(false);
    toast.success("Request sent! Wait for approval.");
    // Optionally reset form here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Info panel */}
        <div className="md:w-1/2 flex flex-col justify-center items-center bg-blue-700 text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Become an Educator</h2>
          <p className="text-lg mb-6 text-blue-100 text-center">
            Join our mission to empower students!
            <br />
            After registration, NGO admins will review and approve your request
            before you can access the platform as an educator.
          </p>
          <svg
            className="w-24 h-24 text-blue-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 48 48"
          >
            <circle cx="24" cy="24" r="22" strokeOpacity="0.2" />
            <path
              d="M16 32v-2a4 4 0 014-4h8a4 4 0 014 4v2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="24"
              cy="20"
              r="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Form panel */}
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 p-8 space-y-6 flex flex-col justify-center"
        >
          <h3 className="text-2xl font-bold text-blue-700 mb-2 text-center md:text-left">
            Register as Educator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Qualification</label>
              <input
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Contact</label>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEducator;
