import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/myOrder.css';
import axios from 'axios';

const OrderPage = () => {
  const BASE_URL =   process.env.REACT_APP_BASE_URL
  const { tb_no } = useParams();
  console.log("orderpage", tb_no);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState({ tno: tb_no, status: false, orders: [] });
  const [total, setTotal] = useState(0);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [name, setName] = useState(''); 
  const [category, setCategory] = useState(''); 
  const [rate, setRate] = useState(''); 
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get('http://localhost:4000/userData', { withCredentials: true,
      headers:{
         Authorization: `Bearer ${token}`
      }
     })
      .then(res => {
        const userData = res.data;
        if (userData.email && userData.name) {
          setUser(userData);
        } else {
          console.log("Not yet logged in", res);
          navigate('/login');
        }
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        navigate('/login');
      });
  }, [navigate]);


  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/dishes', {
          credentials: 'include',
          headers:{
             Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Error fetching dishes');
        }
        const data = await response.json();
        console.log(data);
        setDishes(data);
        setFilteredDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);


  useEffect(() => {
    let filtered = dishes;

    if (name) {
      filtered = filtered.filter(dish => 
        dish.name && dish.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    

    if (category) {
      filtered = filtered.filter(dish => dish.category === category);
    }

    if (rate) {
      filtered = filtered.filter(dish => dish.rate <= rate);
    }

    setFilteredDishes(filtered);

  }, [name, category, rate, dishes]); 


  const Increment = async(item_id) => {
    const dish = dishes.find(d => d.item_id === item_id);
    if (dish) {
      setOrders(prevOrders => {
        const existingOrder = prevOrders.orders.find(order => order.dish === dish.name);
        let updatedOrders;
        if (existingOrder) {
          updatedOrders = prevOrders.orders.map(order =>
            order.dish === dish.name ? { ...order, quantity: order.quantity + 1, price: order.price + dish.rate } : order
          );
        } else {
          updatedOrders = [...prevOrders.orders, { dish: dish.name, quantity: 1, price: dish.rate }];
        }
        return { ...prevOrders, orders: updatedOrders };
      });
      setTotal(prevTotal => prevTotal + dish.rate);
      try {
        const response = await fetch(`http://localhost:4000/tables/update/${parseInt(tb_no, 10)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ orders }), 
          credentials: 'include',
        });
      
        if (response.ok) {
          console.log("Table updated");
        } else {
          console.error('Failed to update table');
        }
      } catch (error) {
        console.error('Error updating table:', error);
      }
      
    try {
      console.log("Decrement id : ",item_id);
      const response = await fetch(`http://localhost:4000/api/dishes/orderOne/${item_id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers:{
             Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error decrementing dish quantity');
      }

      
      setDishes(prevDishes => prevDishes.map(d => 
        d.item_id === item_id ? { ...d, quantity: d.quantity - 1 } : d
      ));
    } catch (error) {
      console.error('Error decrementing dish quantity:', error);
    }
  }
};

  const generateBill = async (total) => {
    try {
      const response = await fetch('http://localhost:4000/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        }, credentials: 'include',
        body: JSON.stringify({
          name: user.name, 
          email_id: user.email,
          date: new Date(),
          time: new Date().toLocaleTimeString(),
          tableNo:tb_no,
          orders: orders.orders,
          total: total
        })
      });

      if (!response.ok) {
        throw new Error('Error generating bill');
      }else{
        console.log(response);

        navigate(`/payment/${total}`);
      await fetch('http://localhost:4000/tables/clear/${tb_no}', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        }, credentials: 'include',
        body: JSON.stringify({ status: true, orders: [], total: 0 })
      });

     
    }
    } catch (error) {
      console.error('Error generating bill:', error);
    }
    
  };




  return (
    <div className='orderpg'>
       <h1 className='dishes-list'>Make your Instant Orders</h1>
             <div className='image-gallery'>
    <div className='image-item'>
      <img src='/pictures/img1 (2).jpg' alt='Image1' />
    </div>
    <div className='image-item'>
      <img src='/pictures/pic2.jpg' alt='Image2' />
    </div>
    <div className='image-item'>
      <img src='/pictures/dwn.jpg' alt='Image3' />
    </div>
    </div>
      <h1 className='dishes-list'>View All Dishes</h1>

      <div className="search-bars">
        <input
          type="text" className='ordersearch'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name"
        />

        <select  className='dropdown'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Appetizers">Appetizers</option>
          <option value="Main Courses">Main Courses</option>
          <option value="Snacks">Snacks</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
          <option value="Grilled Items">Grilled Items</option>
        </select>

        <input 
          type="number" className='ordersearch'
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Search by rate (less than)"
        />
      </div>

   

      <div className='v-dish_list'>
  {filteredDishes.length > 0 ? (
   filteredDishes.map(dish => (
      <div className='myorder-dish' key={dish.item_id}>
        {/* <img src={`/images/${dish.image}`} alt={dish.name} className='myorder-dish-img' /> */}
        <div className='myorder-desc'>
          <h3 className='myorder-dish-name'>{dish.name}</h3>
          <h3 className='myorder-dish-rate'> ₹ {dish.rate}</h3>
          <h3 className='myorder-dish-rating'>
            <img 
              src="https://img.freepik.com/free-vector/3d-metal-star-isolated_1308-117760.jpg?t=st=1744058718~exp=1744062318~hmac=94b46582eba9964e387269fb7479affff9b03bd2d36a9414fcaa1d7731f8f045&w=826" 
              alt="star" 
              className='myorder-rating-pic' 
            />
            {dish.rating}
          </h3>
        </div>
        <div className='myorder-shop'>
          <h3 className='myorder-dish-count'> 
            {dish.quantity}
            <span className='myorder-shop-btn'>
              <button type='button' onClick={() => Increment(dish.item_id)}> + </button>
            </span>
          </h3>
        </div>
      </div>
    ))
  ) : (
    <p>No matching dishes found</p>
  )}
</div>


      
      <div className='order-summary'>
        <h2>Order Summary</h2>
        <table className='orders-table'>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.dish}</td>
                <td>{order.quantity}</td>
                <td>₹ {order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='generate-bill'>
        <div className='my-meals'>
          <h3>Total : ₹ {total}</h3>
        </div>
        <button type="button" className='pay-btn' onClick={()=>generateBill(total)}>
          Proceed to Payment
        </button>
      </div>
    </div>
   
  );
};

export default OrderPage;
