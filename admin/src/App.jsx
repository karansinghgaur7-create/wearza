import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Slidebar";

import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./components/Login";

export const backUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen">
        {!token ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />

            <hr />

            <div className="flex w-full">
              <Sidebar />

              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path="/" element={<Navigate to="/add" />} />
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/order" element={<Order token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;