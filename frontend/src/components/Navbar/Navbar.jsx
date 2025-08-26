import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin, searchTerm, setSearchTerm, setIsLoading }) => {
    const [menu, setMenu] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value.length > 0) {
            const filteredSuggestions = food_list
                .filter(item => 
                    item.name.toLowerCase().includes(value.toLowerCase()) ||
                    item.category.toLowerCase().includes(value.toLowerCase())
                )
                .slice(0, 5);
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
        
        if (value && setIsLoading) {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 800);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name);
        setShowSuggestions(false);
        setShowSearch(false);
        if (setIsLoading) {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 500);
        }
        // Navigate to home if not already there
        if (window.location.pathname !== '/') {
            navigate('/');
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setShowSuggestions(false);
        setShowSearch(false);
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>

            {/* Desktop  Mobile Menu */}
            <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                <Link to='/' onClick={() => { setMenu("home"); setIsMenuOpen(false); }} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => { setMenu("menu"); setIsMenuOpen(false); }} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => { setMenu("mobile-app"); setIsMenuOpen(false); }} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={() => { setMenu("contact-us"); setIsMenuOpen(false); }} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
                          {/* Hamburger Menu Icon */}
            <div
                    className={`menu-icon ${isMenuOpen ? "open" : ""}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
            </div>

            <div className="navbar-right">
                <div className="navbar-search">
                    <div className="search-toggle" onClick={() => setShowSearch(!showSearch)}>
                        <img src={assets.search_icon} alt="search" />
                    </div>
                    
                    {showSearch && (
                        <div className="search-dropdown">
                            <div className="search-box">
                                <img src={assets.search_icon} alt="search" className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search dishes..."
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="search-input"
                                    autoFocus
                                />
                                {searchTerm && (
                                    <button onClick={clearSearch} className="clear-btn">
                                        <img src={assets.cross_icon} alt="clear" />
                                    </button>
                                )}
                            </div>
                            
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="search-suggestions">
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="suggestion-item"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <img src={`https://foodiexpress-backend.onrender.com/images/${suggestion.image}`} alt={suggestion.name} />
                                            <div className="suggestion-info">
                                                <span className="suggestion-name">{suggestion.name}</span>
                                                <span className="suggestion-category">{suggestion.category}</span>
                                            </div>
                                            <span className="suggestion-price">${suggestion.price}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token?<button onClick={() => setShowLogin(true)}>Sign In</button>
                :<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className="nav-profile-dropdown">
                        <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>
                </div>
                }
                
            </div>
        </div>
    );
}

export default Navbar;

