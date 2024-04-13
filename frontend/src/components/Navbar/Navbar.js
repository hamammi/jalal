import React from 'react';
import { Link } from 'react-router-dom'; // استيراد Link من react-router-dom
import { FaShoppingCart } from 'react-icons/fa'; // استيراد أيقونة سلة الشراء من react-icons
import logo from '../img/logo.png'; // تأكد من تحديث المسار حسب موقع ملف الشعار
import './Navbar.css'; // استيراد ملف الأنماط CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '100px', width: '200px' }} />
        </Link>
      </div>
      <div className="hidden">
        <FaShoppingCart />
      </div>
      <Link to="/my-order" className="navbar-icon">
        <FaShoppingCart style={{ fontSize: '45px' }} />
      </Link>
    </nav>
  );
};

export default Navbar;
