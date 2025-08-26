import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2> Quick and Tasty Food at Your Fingertips 🍔</h2>
            <button onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Menu
            </button>
        </div>
    </div>
  )
}

export default Header
