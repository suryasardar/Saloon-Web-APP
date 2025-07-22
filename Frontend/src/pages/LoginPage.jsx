import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") navigate("/dashboard");
      else if (role === "user") navigate("/user");
      else setError("Unknown role from server.");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">
          Login
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-400 font-semibold">{error}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-yellow-400" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="username"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-yellow-400" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
