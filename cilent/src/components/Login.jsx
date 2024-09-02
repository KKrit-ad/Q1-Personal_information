import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // นำเข้าไฟล์ CSS
import Footer from "./Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      ); // ใช้ URL ของเซิร์ฟเวอร์ที่ทำงานอยู่
      localStorage.setItem("token", response.data.token); // เก็บ token ใน localStorage
      navigate("/home"); // เปลี่ยนเส้นทางไปที่หน้า HomePage
    } catch (err) {
      setError("Login failed. Please check your email and password."); // ข้อความแสดงข้อผิดพลาด
    }
  };

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>} {/* แสดงข้อผิดพลาด */}
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
