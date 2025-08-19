import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
    }

    const onSubmitHandler = async(event) => {
        event.preventDefault();
        setLoading(true);
        
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        
        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                })
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='add fade-in'>
            <div className="add-header">
                <h1 className="add-title">Add New Item</h1>
                <p className="add-subtitle">Create a new food item for your menu</p>
            </div>

            <form className='add-form' onSubmit={onSubmitHandler}>
                <div className="form-section">
                    <h3 className="section-title">Product Image</h3>
                    <div className="add-image-upload">
                        <label htmlFor="image" className={`upload-area ${image ? 'has-image' : ''}`}>
                            <img 
                                src={image ? URL.createObjectURL(image) : assets.upload_area} 
                                alt="Upload preview" 
                            />
                            <div className="upload-text">
                                {image ? 'Click to change image' : 'Click to upload image'}
                            </div>
                            <div className="upload-hint">
                                Supports: JPG, PNG, GIF (Max: 5MB)
                            </div>
                        </label>
                        <input 
                            onChange={(e) => setImage(e.target.files[0])} 
                            type="file" 
                            id='image' 
                            hidden 
                            required 
                            accept="image/*"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="section-title">Product Details</h3>
                    <div className="form-group">
                        <label className="form-label">Product Name</label>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            name='name' 
                            placeholder='Enter product name' 
                            className="form-input"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Product Description</label>
                        <textarea 
                            onChange={onChangeHandler} 
                            value={data.description} 
                            name="description" 
                            placeholder='Describe your product...' 
                            className="form-textarea"
                            required 
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="section-title">Category & Pricing</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select 
                                onChange={onChangeHandler} 
                                name="category" 
                                value={data.category}
                                className="form-select"
                            >
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Deserts">Deserts</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Cake">Cake</option>
                                <option value="Pure Veg">Pure Veg</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Price ($)</label>
                            <input 
                                onChange={onChangeHandler} 
                                value={data.price} 
                                type="number" 
                                name='price' 
                                placeholder='10.99' 
                                className="form-input"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="submit-section">
                    <button 
                        type='submit' 
                        className='submit-btn'
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner"></div>
                                Adding...
                            </>
                        ) : (
                            <>
                                <span>✨</span>
                                Add Product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Add