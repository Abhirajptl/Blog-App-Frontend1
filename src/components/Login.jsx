import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSignup = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/user/login`, data);
      alert("You are successfully logged in!");
      console.log("API Response:", response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        if (response.data.userId) {
          localStorage.setItem("userId", response.data.userId);
        } else {
          console.warn("userId is not present in the API response");
        }
        navigate("/blogs");
      }
    } catch (error) {
      setError("Registration Failed please try again",error);
    }
  };

  return (
    <div className="login-container">
      <h3>Please Login</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="username"
        value={data.username}
        onChange={(e) => handleSignup(e)}
        type="text"
        id="username"
        placeholder="ENTER USERNAME"
      />
      <input
        name="password"
        value={data.password}
        onChange={(e) => handleSignup(e)}
        type="text"
        id="password"
        placeholder="ENTER PASSWORD"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
