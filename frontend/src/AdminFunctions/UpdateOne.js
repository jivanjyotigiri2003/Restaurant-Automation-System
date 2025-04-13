import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './adminfunctions.css';

const UpdateOne = () => {
  const { item_id } = useParams();
  const [dish, setDish] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rate: 0,
    quantity: 0,
    rating: 0,
  });

  useEffect(() => {
    // Load dish from localStorage
    const storedDishes = JSON.parse(localStorage.getItem('dishes')) || [];
    const foundDish = storedDishes.find(d => d.item_id === item_id);
    
    if (foundDish) {
      setDish(foundDish);
      setFormData({
        name: foundDish.name,
        rate: foundDish.rate,
        quantity: foundDish.quantity,
        rating: foundDish.rating,
      });
    }
  }, [item_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateOne = () => {
    const storedDishes = JSON.parse(localStorage.getItem('dishes')) || [];
    const dishIndex = storedDishes.findIndex(d => d.item_id === item_id);

    if (dishIndex === -1) {
      alert('Dish not found');
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.rate) {
      alert('Name and Rate are required fields');
      return;
    }

    // Update the dish
    const updatedDish = {
      ...storedDishes[dishIndex],
      name: formData.name,
      rate: Number(formData.rate),
      quantity: Number(formData.quantity),
      rating: Number(formData.rating),
    };

    // Update the dishes array
    const updatedDishes = [...storedDishes];
    updatedDishes[dishIndex] = updatedDish;

    // Save back to localStorage
    localStorage.setItem('dishes', JSON.stringify(updatedDishes));
    alert('Dish updated successfully');
  };

  return (
    <div className='update_dish'>
      <h1>Update Dish</h1>
      <p>ID to be Updated: {item_id}</p>
      {dish && (
        <div className='dish-details'>
          <label htmlFor="name">Dish Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            className='input_box' 
            onChange={handleInputChange} 
            required 
          /><br /><br />

          <label htmlFor="rate">Rate:</label>
          <input 
            type="number" 
            id="rate" 
            name="rate" 
            value={formData.rate} 
            className='input_box' 
            onChange={handleInputChange} 
            required 
          /><br /><br />

          <label htmlFor="quantity">Quantity:</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            value={formData.quantity} 
            className='input_box' 
            onChange={handleInputChange} 
          /><br /><br />

          <label htmlFor="rating">Rating:</label>
          <input 
            type="number" 
            id="rating" 
            name="rating" 
            min="0" 
            max="5" 
            value={formData.rating} 
            className='input_box' 
            onChange={handleInputChange} 
          /><br /><br />

          <button 
            type='button' 
            onClick={handleUpdateOne} 
            className='update_btn'
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateOne;