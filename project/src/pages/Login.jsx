import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });

    if (onLoginSuccess) onLoginSuccess();
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1B263B] to-[#0D1B2A]">
      <div className="bg-[#E0E1DD] shadow-2xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0D1B2A]">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="block mb-4">
            <span className="text-[#1B263B] font-medium">Email</span>
            <input
              type="email"
              className="w-full mt-2 p-2 bg-white text-black border border-[#B3AF8F] rounded-md focus:ring-2 focus:ring-[#415A77] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {/* Password */}
          <label className="block mb-6">
            <span className="text-[#1B263B] font-medium">Password</span>
            <input
              type="password"
              className="w-full mt-2 p-2 bg-white text-black border border-[#B3AF8F] rounded-md focus:ring-2 focus:ring-[#415A77] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#415A77] text-white py-2 rounded-md hover:bg-[#1B263B] transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[#1B263B]">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[#415A77] font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
