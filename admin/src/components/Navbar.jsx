// src/components/Navbar.jsx

import React from "react";
import logo from "../../src/assets/logo.png";

const Navbar = ({ setToken }) => {

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">

      {/* Logo */}
      <img
        className="h-12 w-auto"
        src={logo}
        alt="Logo"
      />

      {/* Logout Button */}
      <button
        onClick={logout}
        className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;