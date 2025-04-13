import React, { useEffect, useState } from 'react';
import '../css/navbar.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Navbar = () => {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get('http://localhost:4000', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data.valid) {
        setName(res.data.name);
        setIsLoggedIn(true);
      } else {
        navigate('/login');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      navigate('/login');
    });
  }, [navigate, token]);

  const handleLogout = () => {
    axios.post('http://localhost:4000/logout', {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data.success) {
        localStorage.removeItem('authToken');
        setName('');
        setIsLoggedIn(false);
        navigate('/login');
        alert('Logged out successfully');
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

  return (
    <section className='navbar'>
      <div className='nav-section1'>
        <img src='pictures/logos.jpg' className="logo" alt='logo' />
        <div className='nav-page'>Serve Smart</div>
      </div>
      <div className='nav-section2'>
        <li><Link to='/'>Dishes</Link></li>
        <li><Link to='/order'>Orders</Link></li>
        <li><Link to='/history'>History</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        
        {isLoggedIn ? (
          <button 
            type="button" 
            onClick={handleLogout} 
            className='navbar-btn'
          >
            Logout
          </button>
        ) : (
          <button 
            type="button" 
            onClick={() => navigate('/login')} 
            className='navbar-btn'
          >
            Login
          </button>
        )}
      </div>
    </section>
  );
};

export default Navbar;