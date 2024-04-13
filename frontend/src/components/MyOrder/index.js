import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const MyOrder = () => {
    const [orderID, setOrderID] = useState(localStorage.getItem('orderId'));
    const [myItems, setMyItems] = useState([]);

    useEffect(() => {
        axios.get(`https://jalal.store:5000/item/byOrder/${orderID}`)
            .then(res => {
                setMyItems(res.data.Productss);
            })
            .catch(err => console.error(err));
    }, [orderID]);

    const confirmOrder = () => {
        const whatsappNumber = "9620790987058"; // ضع رقم واتساب الذي تريد إرسال الرسالة إليه هنا
        const message = `Confirm your order by visiting: https://jalal.store:3000/order/${orderID}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    

    return (
        <div className="order-page">
            <h1>Your Order Details</h1>
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
            <button className="confirm-btn" onClick={confirmOrder}>أرسال الطلب</button>
        </div>
    );
};

export default MyOrder;
