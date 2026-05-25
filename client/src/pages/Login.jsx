import React, { useState, useContext } from "react";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext.jsx";

const LogIn = () => {

  const { setToken } = useContext(ShopContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (currentState === "Sign Up") {
        response = await axios.post(
          backendUrl + "/api/user/register",
          { name, email, password }
        );
      } else {
        response = await axios.post(
          backendUrl + "/api/user/login",
          { email, password }
        );
      }

      console.log(response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success(currentState === "Sign Up" ? "Registered Successfully!" : "Logged In Successfully!");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (

    <form className="login-form" onSubmit={onSubmitHandler}>

      <div className="login-header">

        <p className="login-title">
          {currentState}
        </p>

        <hr className="login-line" />

      </div>

      {currentState === "Sign Up" && (

        <input
          type="text"
          className="login-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

      )}

      <input
        type="email"
        className="login-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="login-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="login-options">

        <p className="login-link">
          Forgot your password?
        </p>

        {currentState === "Login" ? (

          <p
            onClick={() => setCurrentState("Sign Up")}
            className="login-link"
          >
            Create Account
          </p>

        ) : (

          <p
            onClick={() => setCurrentState("Login")}
            className="login-link"
          >
            Login Here
          </p>

        )}

      </div>

      <button type="submit" className="login-btn">

        {currentState === "Login"
          ? "Sign In"
          : "Sign Up"}

      </button>

    </form>
  );
};

export default LogIn;