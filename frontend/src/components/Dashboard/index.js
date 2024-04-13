import React, { useState } from 'react';
import './index.css';
import CreateCategoy from'../CreateCategoy/index'
import CreateProducts from'../CreateProducts/index'
// مكونات مختلفة كمثال
const AddCategory = () => <CreateCategoy/>;
const AddProduct = () => <CreateProducts/>;
const hidenProduct = () => <div>hiden Product Content</div>;
const Orders = () => <div>Orders</div>;
const completeOrders = () => <div>complete orders</div>;
const confirmeOrders = () => <div>confirme orders</div>;
// ... باقي المكونات ...

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('addProduct');

  const components = {
    addProduct: AddProduct,
    addCategory: AddCategory,
    hidenProduct:hidenProduct,
    Orders:Orders,
    completeOrders:completeOrders,
    confirmeOrders:confirmeOrders,
    // ... أضف المكونات الأخرى هنا ...
  };

  const ComponentToRender = components[activeComponent];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <ul>
          <li onClick={() => setActiveComponent('addCategory')}>إضافة فئة جديدة</li>
          <li onClick={() => setActiveComponent('addProduct')}>إضافة منتج جديد</li>
          <li onClick={() => setActiveComponent('hidenProduct')}>اخفاء منتج</li>
          <li onClick={() => setActiveComponent('Orders')}>كل الطلبات</li>
          <li onClick={() => setActiveComponent('completeOrders')}>الطلبات المكتملة</li>
          <li onClick={() => setActiveComponent('confirmeOrders')}>الطلبات المؤكدة</li>
        </ul>
      </aside>
      <main className="content">
        <ComponentToRender />
      </main>
    </div>
  );
};

export default Dashboard;
