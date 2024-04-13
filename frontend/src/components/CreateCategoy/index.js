import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css"; // استيراد ملف CSS

const CreateCategory = () => {
    const [colors, setColors] = useState([]);
    const [selectedColorId, setSelectedColorId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://jalal.store:5000/color/`)
            .then((res) => {
                setColors(res.data.color);

            })
            .catch((err) => {
                console.error(err);
            });
    },[]);

    const handleSubmit = () => {
        if(selectedColorId && categoryName){
            axios.post(`https://jalal.store:5000/categories/`,({selectedColorId,categoryName,description}))
            .then((res) => {
                navigate("/admin")

            })
            .catch((err) => {
                console.error(err);
            });
        }
    };

    return (
        <div className="createCategoryContainer">
            <select value={selectedColorId} onChange={(e) => setSelectedColorId(e.target.value)} className="createCategorySelect">
                <option value="">اختر لون</option>
                {colors.map((color) => (
                    <option key={color.colorid} value={color.colorid} style={{ backgroundColor: color.rgb }}>
                        {color.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="اسم الفئة"
                className="createCategoryInput"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="شرح"
                className="createCategoryInput"
            />
            <button onClick={handleSubmit} className="createCategoryButton">تأكيد</button>
        </div>
    );
};

export default CreateCategory;
