import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handelRegister = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("https://jalal.store:5000/admin/register", user)
      .then((result) => {
         setTimeout(() => {
            setTimeout(() => {
            navigate("/");
          }, 2000);
          return () => clearTimeout();
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
    });
  };
  
  

  return (
    <div className="login-container">
      <div className="login-form">
        <input
          type="email"
          placeholder="الإيميل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handelRegister}>تسجيل جديد</button>
      </div>
    </div>
  );
};

export default Register;
