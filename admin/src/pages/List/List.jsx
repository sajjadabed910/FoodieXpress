import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"

const List = ({url}) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/food/list`);

            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching items!");
            }
        } catch (error) {
            toast.error("Failed to fetch items!");
        } finally {
            setLoading(false);
        }
    }

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
            await fetchList();
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error("Error removing item!");
            }
        } catch (error) {
            toast.error("Failed to remove item!");
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    if (loading) {
        return (
            <div className='list fade-in'>
                <div className="loading-state">
                    <div className="spinner"></div>
                    Loading items...
                </div>
            </div>
        );
    }

    return (
        <div className='list fade-in'>
            <div className="list-header">
                <h1 className="list-title">Food Items</h1>
                <div className="list-stats">
                    <div className="stat-badge">
                        Total: {list.length} items
                    </div>
                </div>
            </div>

            <div className="list-container">
                {list.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🍽️</div>
                        <h3 className="empty-title">No items found</h3>
                        <p className="empty-description">
                            Start by adding your first food item to the menu
                        </p>
                    </div>
                ) : (
                    <div className="list-table">
                        <div className="list-table-header">
                            <div>Image</div>
                            <div>Details</div>
                            <div>Category</div>
                            <div>Price</div>
                            <div>Action</div>
                        </div>
                        
                        {list.map((item, index) => (
                            <div key={index} className='list-table-row'>
                                <img 
                                    src={`${url}/images/${item.image}`} 
                                    alt={item.name}
                                    className="item-image"
                                />
                                
                                <div className="item-details">
                                    <h3 className="item-name">{item.name}</h3>
                                    <p className="item-description">{item.description}</p>
                                </div>
                                
                                <div className="item-category">{item.category}</div>
                                
                                <div className="item-price">{item.price}</div>
                                
                                <button 
                                    onClick={() => removeFood(item._id)} 
                                    className="delete-btn"
                                    title="Delete item"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default List