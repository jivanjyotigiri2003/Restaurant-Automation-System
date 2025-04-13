import React, { useEffect, useState } from 'react';
import './adminfunctions.css';
import './view.css';

const ViewPackage = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Get dishes from localStorage on component mount
    const storedDishes = JSON.parse(localStorage.getItem('dishes')) || [];
    setDishes(storedDishes);
  }, []);

  const renderDish = (dish) => {
    if (!dish.category) return null;

    return (
      <div key={dish.item_id} className={`view-dish-item view-${dish.category.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="view-dish-details">
          <p><span className="view-dish-key">Dish Name:</span> <span className="view-dish-value">{dish.name}</span></p>
          <p><span className="view-dish-key">Item ID:</span> <span className="view-dish-value">{dish.item_id}</span></p>
          <p><span className="view-dish-key">Rate:</span> <span className="view-dish-value">₹{dish.rate}</span></p>
          <p><span className="view-dish-key">Quantity:</span> <span className="view-dish-value">{dish.quantity}</span></p>
          <p><span className="view-dish-key">Rating:</span> <span className="view-dish-value">{dish.rating}</span></p>
        </div>
      </div>
    );
  };

  return (
    <div className='view-dish'>
      <h1>View All Dishes</h1>
      <div className='view-dish-list'>
        {dishes.map(renderDish)}
      </div>
    </div>
  );
};

export default ViewPackage;