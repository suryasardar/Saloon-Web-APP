import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here (e.g. API call)
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">
          Sign Up
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-yellow-400" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-yellow-400" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-yellow-400" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-yellow-400" htmlFor="role">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
