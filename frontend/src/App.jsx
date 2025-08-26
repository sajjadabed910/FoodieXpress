import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const[showLogin,setShowLogin]=useState(false);
  const[searchTerm,setSearchTerm]=useState("");
  const[isLoading,setIsLoading]=useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}

      <div className='app'>
        <Navbar 
          setShowLogin={setShowLogin}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsLoading={setIsLoading}
        />
        <Routes>
          <Route path='/' element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App

