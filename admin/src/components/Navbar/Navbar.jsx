import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar fade-in'>
      <div className="navbar-brand">
        <img className='logo' src={assets.logo} alt="FoodieXpress" />
        <h1 className="navbar-title">Admin Panel</h1>
      </div>
      
      <div className="navbar-right">
        <div className="navbar-profile">
          <img className='profile' src={assets.profile_image} alt="Profile" />
          <div className="profile-info">
            <span className="profile-name">Admin User</span>
            <span className="profile-role">Administrator</span>
          </div>
          <div className="status-indicator"></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar