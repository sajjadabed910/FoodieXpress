import React, {useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = ({searchTerm, setSearchTerm, isLoading, setIsLoading}) => {

  const[category,setCategory]= useState("All");

  return (
    <div className="home-container">
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay 
          category={category} 
          searchTerm={searchTerm}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <AppDownload/>
    </div>
  )
}

export default Home
