import React from 'react'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () =>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const getOrderId = (index) => {
        return `#FX${String(index + 1001).padStart(4, '0')}`;
    }

    return (
        <div className='my-orders'>
            <div className="my-orders-header">
                <h2>My Orders</h2>
                <p>Track your delicious orders and reorder your favorites</p>
            </div>
            
            <div className="container">
                {data.length === 0 ? (
                    <div className="empty-orders">
                        <img src={assets.parcel_icon} alt="No orders" />
                        <h3>No Orders Yet</h3>
                        <p>Looks like you haven't placed any orders yet. Start exploring our delicious menu!</p>
                        <button onClick={() => navigate('/')}>Browse Menu</button>
                    </div>
                ) : (
                    data.map((order,index)=>{
                        return (
                            <div key={index} className='my-orders-order'> 
                                <div className="order-header">
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <div className="order-icon">
                                            <img src={assets.parcel_icon} alt="" />
                                        </div>
                                        <div className="order-info">
                                            <div className="order-id">{getOrderId(index)}</div>
                                            <div className="order-date">{formatDate(order.date || new Date())}</div>
                                        </div>
                                    </div>
                                    <div className="order-status">{order.status}</div>
                                </div>

                                <div className="order-details">
                                    <div className="order-items">
                                        <h4>Items Ordered</h4>
                                        <p>{order.items.map((item,index)=>{
                                            if(index=== order.items.length-1){
                                                return item.name+" x "+item.quantity;
                                            }
                                            else{
                                                return item.name+" x "+item.quantity + ", ";
                                            }
                                        })}</p>
                                    </div>

                                    <div className="order-summary">
                                        <div className="summary-item">
                                            <span>Items:</span>
                                            <span>{order.items.length}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span>Subtotal:</span>
                                            <span className="amount">${order.amount - 3}.00</span>
                                        </div>
                                        <div className="summary-item">
                                            <span>Delivery:</span>
                                            <span className="amount">$3.00</span>
                                        </div>
                                        <div className="summary-item total">
                                            <span>Total:</span>
                                            <span className="amount">${order.amount}.00</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-actions">
                                    <button className="reorder-btn">Reorder</button>
                                    <button className="track-btn">Track Order</button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default MyOrders