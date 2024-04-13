import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Login/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import GetAllProductByCategoriesID from "./components/getAllProductByCategoriesID/index"
import ViewImage from "./components/ViewImage";
import MyOrder from "./components/MyOrder";
import ConfirmeOrder from "./components/ConfirmeOrder";
function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/register/new" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<GetAllProductByCategoriesID />} />
        <Route path="/viewImage" element={<ViewImage/>} />
        <Route path="/my-order" element={<MyOrder/>} />
        <Route path="/order/:orderId" element={<ConfirmeOrder/>} />
      </Routes>
      
    </div>
  );
}

export default App;
