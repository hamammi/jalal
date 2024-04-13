import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from './logo.png';
import "./style.css";

const ViewImage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // استخدام useNavigate هنا
  const queryParams = new URLSearchParams(location.search);
  const imagePath = queryParams.get('imagePath');

  return (
    <div className="image-view-container">
      <img src={imagePath} alt="View" className="full-image" />
      <img src={logo} alt="Logo" className="overlay-logo-view" />
      <button onClick={() => navigate(-1)} className="back-button">عودة</button> {/* استخدام navigate للعودة */}
    </div>
  );
};

export default ViewImage;
