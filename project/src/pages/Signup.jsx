import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signing up:", { username, email, password });

    if (onSignupSuccess) onSignupSuccess();
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-teal-500">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label className="block mb-3">
            <span className="text-gray-700">Username</span>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="block mb-3">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
