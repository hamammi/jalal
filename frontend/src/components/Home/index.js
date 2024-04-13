import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://jalal.store:5000/categories/`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.error(err);
      });
    axios.get(`https://jalal.store:5000/color/`)
      .then((res) => {
        setColors(res.data.color);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const findColor = (colorid) => colors.find(color => color.colorid === colorid)?.rgb;

  return (
    <div className="home-container">
      {categories.map((category) => (
        <div
          key={category.categoryid}
          className="category-box"
          style={{ backgroundColor: findColor(category.colorid) }}
          onClick={() =>{
            localStorage.setItem('categoryid', category.categoryid);
            navigate('/products', { state: { categoryid: category.categoryid } })}
          } 
        >
          <p>{category.categoryname}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
