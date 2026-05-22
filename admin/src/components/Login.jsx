// src/components/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { backUrl } from "../App";

const Login = ({ setToken }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        `${backUrl}/api/user/admin`,
        {
          email,
          password,
        }
      );

      if (response.data.success) {

        localStorage.setItem("token", response.data.token);

        setToken(response.data.token);

      } else {

        alert(response.data.message);

      }

    } catch (error) {

      console.log("FULL ERROR :", error);

      if (error.response) {

        console.log("RESPONSE ERROR :", error.response.data);

        alert(error.response.data.message);

      } else {

        alert("Backend connection failed");

      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Panel
        </h1>

        <form
          onSubmit={onSubmitHandler}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>

            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-500"
            />

          </div>

          {/* Password */}
          <div>

            <p className="text-sm font-medium text-gray-700 mb-2">
              Password
            </p>

            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-500"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;