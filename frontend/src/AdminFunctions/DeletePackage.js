import React, { useEffect, useState } from 'react';
import './adminfunctions.css';

const DeleteDish = () => {
  const [dishes, setDishes] = useState([]);

  // Load dishes from localStorage on component mount
  useEffect(() => {
    const storedDishes = JSON.parse(localStorage.getItem('dishes')) || [];
    setDishes(storedDishes);
  }, []);

  const handleDelete = (itemId) => {
    // Get current dishes from localStorage
    const storedDishes = JSON.parse(localStorage.getItem('dishes')) || [];
    
    // Filter out the dish to delete
    const updatedDishes = storedDishes.filter(dish => dish.item_id !== itemId);
    
    // Update localStorage and state
    localStorage.setItem('dishes', JSON.stringify(updatedDishes));
    setDishes(updatedDishes);
    alert('Dish deleted successfully!');
  };

  return (
    <div className='delete_dish'>
      <h1>Delete Dish</h1>
      <div className='dish_list'>
        {dishes.map((dish, index) => (
          <fieldset key={index}>
            <h3>Dish Name: {dish.name}</h3>
            <h3>Item ID: {dish.item_id}</h3>
            <h3>Rate: {dish.rate}</h3>
            <h3>Quantity: {dish.quantity}</h3>
            <h3>Rating: {dish.rating}</h3>
            <button onClick={() => handleDelete(dish.item_id)} className='delete-btn'>Delete</button>
          </fieldset>
        ))}
      </div>
    </div>
  );
};

export default DeleteDish;