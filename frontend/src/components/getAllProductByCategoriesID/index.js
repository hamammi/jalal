
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useLocation } from "react-router-dom";
import logo from './logo.png';

const GetAllProductByCategoriesID = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [notes, setNotes] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  let { categoryid } = location.state || {};

  useEffect(() => {
    if (!categoryid) {
      categoryid = localStorage.getItem('categoryid');
    }
    axios.get(`https://jalal.store:5000/posts/categories/${categoryid}`)
      .then(res => {setProducts(res.data.Productss)
      })
      .catch(err => console.error(err));
  }, [categoryid]);
  const handleAddToCart = () => {
        const orderId = localStorage.getItem('orderId');
        axios.post(`https://jalal.store:5000/item/`, {
          quantity,
          color,
          notes,
          orderId,
          productId,
        })
        .then((res) => {
          setModalOpen(false)
        })
        .catch((err) => console.error(err));
        
  };
  const handleAddToCartClick = () => {
    if (localStorage.getItem('orderId')) {
      setModalOpen(true)
      
    } else {
      setShowOrderForm(true);
    }
  };

  const handleCreateOrder = () => {
    axios.post(`https://jalal.store:5000/order/`, {
      phoneNumber,
      fullName,
    })
    .then((res) => {
      const orderId = res.data.order[0].orderid
      localStorage.setItem('orderId', res.data.order[0].orderid);
      setShowOrderForm(false);
    })
    .catch((err) => console.error(err));
  };

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <div className="product-box" key={index}>
          <a href={`/viewImage?imagePath=${product.imagepath}`} className="image-link">
            <img src={product.imagepath} alt={product.productname} className="product-image" />
            <img src={logo} alt="Logo" className="overlay-logo" />
          </a>
          <div className="product-info">
            <p className="product-name">{product.productname}</p>
            <p className="product-description">{product.description}</p>
            <button className="button-color" onClick={()=>{
              setProductId(product.productid)
              handleAddToCartClick();
              }}>إضافة إلى السلة</button>
          </div>
        </div>
      ))}
      {showOrderForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowOrderForm(false)}>&times;</span>
            <h2>إنشاء طلب جديد لاضافة المنتجات</h2>
            <input type="text" placeholder="رقم الهاتف" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <input type="text" placeholder="الاسم الكامل" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <button onClick={handleCreateOrder}>تأكيد</button>
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setModalOpen(false)}>&times;</span>
            <div className="modal-body">
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
              <input type="text" placeholder="اللون" value={color} onChange={(e) => setColor(e.target.value)} />
              <input type="text" placeholder="ملاحظات إضافية" value={notes} onChange={(e) => setNotes(e.target.value)} />
              <button onClick={handleAddToCart}>تأكيد الإضافة إلى السلة</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllProductByCategoriesID;
