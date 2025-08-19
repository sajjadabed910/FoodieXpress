import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext} from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {
  const{cartItems,food_list,removeFromCart,addToCart,getTotalCartAmount,url}=useContext(StoreContext);
  const navigate = useNavigate();

  const hasItems = Object.values(cartItems).some(quantity => quantity > 0);

  return (
    <div className='cart'>
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <p>Review your delicious selections before checkout</p>
      </div>

      {!hasItems ? (
        <div className="empty-cart">
          <img src={assets.basket_icon} alt="Empty cart" />
          <h3>Your Cart is Empty</h3>
          <p>Looks like you haven't added any delicious items to your cart yet. Start exploring our amazing menu!</p>
          <button onClick={() => navigate('/')}>Browse Menu</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Image</p>
              <p>Item</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr className="cart-divider" />
            {food_list.map((item,index)=>{
              if(cartItems[item._id]>0){
                return(
                  <div key={index}>
                    <div className='cart-items-item'>
                      <img className="cart-item-image" src={url+"/images/"+item.image} alt="" />
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">${item.price}</p>
                      <div className="cart-item-quantity">
                        <button className="quantity-btn" onClick={()=>removeFromCart(item._id)}>-</button>
                        <span className="quantity-number">{cartItems[item._id]}</span>
                        <button className="quantity-btn" onClick={()=>addToCart(item._id)}>+</button>
                      </div>
                      <p className="cart-item-total">${item.price*cartItems[item._id]}</p>
                      <button className="remove-btn" onClick={()=>removeFromCart(item._id)}>×</button>
                    </div>
                    <hr className="cart-divider" />
                  </div>
                )
              }
            })}
          </div>

          <div className="cart-bottom">
            <div className="cart-promocode">
              <h3>Promo Code</h3>
              <p>Have a discount code? Enter it here:</p>
              <div className='cart-promocode-input'>
                <input type="text" placeholder='Enter promo code'/>
                <button>Apply</button>
              </div>
            </div>

            <div className="cart-total">
              <h2>Order Summary</h2>
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
                  <p>Total</p>
                  <p className="amount">${getTotalCartAmount()===0?0:(getTotalCartAmount()+3+(getTotalCartAmount()*0.05)).toFixed(2)}</p>
                </div>
              </div>
              <button onClick={()=>navigate('/Order')}>Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart