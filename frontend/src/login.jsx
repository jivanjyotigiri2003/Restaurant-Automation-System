import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/login.css';

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/login',
        values,
        { withCredentials: true }
      );

      const data = response.data;
      console.log(data);

      if (data.message === 'Login successful') {
        localStorage.setItem('authToken', data.token);
        console.log(data.isAdmin ,"hello");
        if (data.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setErrorMessage(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage('Failed to login. Please try again later.');
      }
    }
  };

  return (
    <div className='login-group'>
      <div className='form-login'>
        <form onSubmit={handleSubmit}>
          <h3 className='login-title'>Login</h3>
          <br />
          <div className="email-login">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={values.email}
              onChange={handleInput}
            />
          </div>
          <br />
          <div className="password-login">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={values.password}
              onChange={handleInput}
            />
          </div>
          <br />
          <div className="checkBox">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="remember-me" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <br />
          <div className="submit-btn">
            <button type="submit" className="btn-login">
              Submit
            </button>
            <br />
          </div><br />
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
          <br />
        </form>
      </div>
      <div className='picture-signup'>
        <div className="centered-content">
          <p>Haven't Registered Yet?</p>
          <button className='btn-login' onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
