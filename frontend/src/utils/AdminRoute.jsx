import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:4000';

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:4000/userData', {
        credentials: 'include',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(userData => {
          setUser(userData);
          console.log('protected authentication for admin:', userData.name);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => {
          setLoading(false); 
        });
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return  user.email === "admin@gmail.com" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
