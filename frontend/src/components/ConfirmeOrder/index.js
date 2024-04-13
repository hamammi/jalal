import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'; // استيراد useParams
import "./style.css";

const ConfirmeOrder = () => {
    const { orderId } = useParams(); // استخدام useParams للحصول على orderId من المسار
    const [myItems, setMyItems] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/item/byOrder/${orderId}`) // استخدام orderId من المسار
            .then(res => {
                setMyItems(res.data.Productss);
            })
            .catch(err => console.error(err));
    }, [orderId]); // إضافة orderId كاعتمادية لـ useEffect

    const confirmOrder = () => {
        const whatsappNumber = "9620790987058";
        const message = `Confirm your order by visiting: http://localhost:3000/order/${orderId}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="order-page">
            <h1>تفاصيل الطلب</h1>
            <div className="items-list">
                {myItems.map(item => (
                    <div key={item.itemid} className="item-card">
                        <img src={item.imagepath} alt={item.productname} className="item-image" />
                        <div className="item-info">
                            <h3>{item.productname}</h3>
                            {/* <p>{item.description}</p> */}
                            <p>العدد: {item.quantity}</p>
                            <p>اللون: {item.color}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConfirmeOrder;
