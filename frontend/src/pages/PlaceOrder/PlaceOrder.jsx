import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}= useContext(StoreContext);
  const navigate = useNavigate();

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const [paymentMethod, setPaymentMethod] = useState("card");

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address:data ,
      items:orderItems,
      amount:getTotalCartAmount()+3,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    } 
    else {
      console.log(response.data)
      alert("error");
    }
  }

  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  },[token])

  return (
    <div className='place-order'>
      <div className="place-order-header">
        <h2>Checkout</h2>
        <p>Complete your order and get ready for delicious food delivery</p>
      </div>

      <form onSubmit={placeOrder} className='place-order-content'>
        <div className="place-order-left">
          <div className='title'>
            <div className="title-icon">🚚</div>
            Delivery Information
          </div>
          
          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Enter your first name' />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Enter your last name' />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email address' />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Enter your phone number' />
            </div>
          </div>

          <div className="form-section">
            <h3>Delivery Address</h3>
            <div className="form-group">
              <label>Street Address</label>
              <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Enter your street address' />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Enter your city' />
              </div>
              <div className="form-group">
                <label>State</label>
                <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Enter your state' />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Zip Code</label>
                <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Enter zip code' />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Enter your country' />
              </div>
            </div>
          </div>
        </div>

        <div className="place-order-right">
          <div className="order-summary">
            <h2>
              <div className="summary-icon">📋</div>
              Order Summary
            </h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p className="amount">${getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p className="amount">${getTotalCartAmount()===0?0:3}</p>
              </div>
              <div className="cart-total-details">
                <p>Tax (5%)</p>
                <p className="amount">${getTotalCartAmount()===0?0:(getTotalCartAmount()*0.05).toFixed(2)}</p>
              </div>
              <div className="cart-total-details total">
                <p>Total Amount</p>
                <p className="amount">${getTotalCartAmount()===0?0:(getTotalCartAmount()+3+(getTotalCartAmount()*0.05)).toFixed(2)}</p>
              </div>
            </div>

            <div className="payment-methods">
              <h4>Payment Method</h4>
              <div className="payment-options">
                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="card" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="card">💳 Credit/Debit Card</label>
                </div>
                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="paypal" 
                    name="payment" 
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paypal">🅿️ PayPal</label>
                </div>
                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="cash" 
                    name="payment" 
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cash">💵 Cash on Delivery</label>
                </div>
              </div>
            </div>

            <button type='submit' className="place-order-btn">
              Complete Order
            </button>

            <div className="security-note">
              <div className="security-icon">🔒</div>
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder