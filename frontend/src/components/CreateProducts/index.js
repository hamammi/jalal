import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './style.css'; 

const CreateProducts = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://jalal.store:5000/categories/`)
            .then((res) => {
                setCategories(res.data.categories);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'uefrfmga');
        data.append("cloud_name", "da0msrlbl");

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/da0msrlbl/image/upload', { 
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                setImageUrl(result.secure_url); 
                const url = result.secure_url
                axios.post(`https://jalal.store:5000/posts/newProduct`,({url,productDescription,productName,selectedCategory}))
                .then((res) => {
                    navigate('/admin')
                    
                })
                .catch((err) => {
                    console.error(err);
                });
            } else {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('An error occurred while uploading the image.');
        }
    };

    return (
        <div className="create-products-container">
            <div className="file-input-container">
                <input type="file" onChange={handleFileChange} />
            </div>
            {imageUrl && <img src={imageUrl} alt="Uploaded" className="uploaded-image" />}
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Select a Category</option>
                {categories.map((category) => (
                    <option key={category.categoryid} value={category.categoryid}>{category.categoryname}</option>
                ))}
            </select>
            <input
                type="text"
                value={productName}
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
            />
            <textarea
                value={productDescription}
                placeholder="Product Description"
                onChange={(e) => setProductDescription(e.target.value)}
            />
            <button onClick={uploadImage}>انشر المنتج</button>
        </div>
    );
};

export default CreateProducts;