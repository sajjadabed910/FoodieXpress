import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category, searchTerm, isLoading, setIsLoading}) => {

    const {food_list}= useContext(StoreContext);
    
    // Filter food items based on category and search term
    const filteredFoodList = food_list.filter((item) => {
        const matchesCategory = category === "All" || category === item.category;
        const matchesSearch = !searchTerm || 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
  return (
    <div className='food-display' id='food-display'>
        {isLoading && (
            <div className="loading-overlay active">
                <div className="loading-spinner"></div>
            </div>
        )}
        
        {searchTerm && (
            <div className="search-results-header">
                <h3>Search Results</h3>
                <p>{filteredFoodList.length} items found for "{searchTerm}"</p>
            </div>
        )}
        
        <div className="food-display-list">
            {filteredFoodList.length > 0 ? (
                filteredFoodList.map((item,index)=>{
                    return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                })
            ) : (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No items found</h3>
                    <p>Try adjusting your search or browse our categories</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default FoodDisplay
