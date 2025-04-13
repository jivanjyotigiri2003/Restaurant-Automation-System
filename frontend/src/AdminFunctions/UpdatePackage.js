import React, { useState, useEffect } from 'react';
import './adminfunctions.css';

const UpdateDish = () => {
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [dishes, setDishes] = useState([]);
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    rate: '',
    quantity: '',
    rating: ''
  });

  // Load dishes from localStorage on component mount
  useEffect(() => {
    const storedDishes = JSON.parse(localStorage.getItem('dishes')) || [];
    setDishes(storedDishes);
  }, []);

  const handleIdSearch = () => {
    const storedDishes = JSON.parse(localStorage.getItem('dishes')) || [];
    const filtered = storedDishes.filter(dish => 
      dish.item_id.toString() === searchId.toString()
    );
    setDishes(filtered);
  };

  const handleNameSearch = () => {
    const storedDishes = JSON.parse(localStorage.getItem('dishes')) || [];
    const filtered = storedDishes.filter(dish => 
      dish.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setDishes(filtered);
  };

  const handleEditClick = (dish) => {
    setSelectedDishId(dish.item_id);
    setEditFormData({
      name: dish.name,
      category: dish.category,
      rate: dish.rate,
      quantity: dish.quantity,
      rating: dish.rating
    });
  };

  const handleCancelClick = () => {
    setSelectedDishId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleUpdate = () => {
    const updatedDishes = dishes.map(dish => {
      if (dish.item_id === selectedDishId) {
        return {
          ...dish,
          ...editFormData,
          rate: Number(editFormData.rate),
          quantity: Number(editFormData.quantity),
          rating: Number(editFormData.rating)
        };
      }
      return dish;
    });

    // Update localStorage
    localStorage.setItem('dishes', JSON.stringify(updatedDishes));
    
    // Update state
    setDishes(updatedDishes);
    setSelectedDishId(null);
    alert('Dish updated successfully!');
  };

  return (
    <div className='update_dish'>
      <h1>Update Package</h1>
      <div className='search-container'>
        <input 
          type='text' 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
          placeholder='Search by Item ID' 
        />
        <button type='button' onClick={handleIdSearch}>Search by ID</button>

        <input 
          type='text' 
          value={searchName} 
          onChange={(e) => setSearchName(e.target.value)} 
          placeholder='Search by Dish Name' 
        />
        <button type='button' onClick={handleNameSearch}>Search by Name</button>
      </div>

      <div className='dish-list'>
        {dishes.map((dish) => (
          <div key={dish.item_id} className='dish-card'>
            {selectedDishId === dish.item_id ? (
              <div className='edit-form'>
                <h2>Edit Dish</h2>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleFormChange}
                    required
                  />
                </label>

                <label>
                  Category:
                  <select
                    name="category"
                    value={editFormData.category}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Main Courses">Main Courses</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Grilled Items">Grilled Items</option>
                  </select>
                </label>

                <label>
                  Rate:
                  <input
                    type="number"
                    name="rate"
                    value={editFormData.rate}
                    onChange={handleFormChange}
                    required
                  />
                </label>

                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={editFormData.quantity}
                    onChange={handleFormChange}
                  />
                </label>

                <label>
                  Rating:
                  <input
                    type="number"
                    name="rating"
                    value={editFormData.rating}
                    min="0"
                    max="5"
                    onChange={handleFormChange}
                  />
                </label>

                <div className="form-buttons">
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className='dish-info'>
                <h2>{dish.name}</h2>
                <p>Category: {dish.category}</p>
                <p>Rate: ₹{dish.rate}</p>
                <p>Quantity: {dish.quantity}</p>
                <p>Rating: {dish.rating}/5</p>
                <button onClick={() => handleEditClick(dish)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateDish;