import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css"; // นำเข้าไฟล์ CSS
import Footer from "./Footer";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token"); // รับ token จาก localStorage

  useEffect(() => {
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`, // ส่ง token ใน headers
          },
        });
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [token]);

  // ฟังก์ชันแปลงวันที่
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="container">
        {user ? (
          <div className="user-info">
            <h1>Welcome, {user.name}</h1>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Birthdate:</strong> {formatDate(user.birthdate)}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>
          </div>
        ) : (
          <p className="error">{error}</p>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
