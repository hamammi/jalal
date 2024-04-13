import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'; // استيراد useParams
import "./style.css";

const ConfirmeOrder = () => {
    const { orderId } = useParams(); // استخدام useParams للحصول على orderId من المسار
    const [myItems, setMyItems] = useState([]);

    useEffect(() => {
        axios.get(`https://jalal.store:5000/item/byOrder/${orderId}`) // استخدام orderId من المسار
            .then(res => {
                setMyItems(res.data.Productss);
            })
            .catch(err => console.error(err));
    }, [orderId]); // إضافة orderId كاعتمادية لـ useEffect
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
