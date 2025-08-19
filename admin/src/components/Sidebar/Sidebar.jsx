import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar slide-in'>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Dashboard</h2>
        <p className="sidebar-subtitle">Manage your restaurant</p>
      </div>
      
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
        </NavLink>
        
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.list_icon} alt="List Items" />
          <p>List Items</p>
        </NavLink>
        
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
      </div>
      
      <div className="sidebar-stats">
        <div className="stat-card">
          <div className="stat-number">24</div>
          <div className="stat-label">Total Items</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">Pending Orders</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar