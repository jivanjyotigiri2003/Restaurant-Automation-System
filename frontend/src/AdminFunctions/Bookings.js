import React, { useState, useEffect } from 'react';
import './adminfunctions.css';

const Bookings = () => {
  const [tables, setTables] = useState([]);

  // Load tables from localStorage
  useEffect(() => {
    const storedTables = JSON.parse(localStorage.getItem('tables')) || [];
    setTables(storedTables);
  }, []);

  // Initialize sample tables if none exist
  const initializeTables = () => {
    const sampleTables = Array.from({ length: 10 }, (_, i) => ({
      _id: `table${i + 1}`,
      tno: i + 1,
      status: true,
      orders: [],
      total: 0
    }));
    
    localStorage.setItem('tables', JSON.stringify(sampleTables));
    setTables(sampleTables);
  };

  // Clear all bookings
  const clearAllBookings = () => {
    const resetTables = tables.map(table => ({
      ...table,
      status: true,
      orders: [],
      total: 0
    }));
    
    localStorage.setItem('tables', JSON.stringify(resetTables));
    setTables(resetTables);
  };

  // Mark table as available
  const markAsAvailable = (tableId) => {
    const updatedTables = tables.map(table => 
      table._id === tableId ? { ...table, status: true, orders: [], total: 0 } : table
    );
    
    localStorage.setItem('tables', JSON.stringify(updatedTables));
    setTables(updatedTables);
  };

  return (
    <div className='booking_pack'>
      <h1>Table Bookings</h1>
      
      {tables.length === 0 && (
        <div className='no-tables'>
          <p>No tables initialized</p>
          <button className='booking-btn' onClick={initializeTables}>Initialize Sample Tables</button>
        </div>
      )}

      {tables.length > 0 && (
        <>
          <button className='clear-all' onClick={clearAllBookings}>
            Clear All Bookings
          </button>

          <div className='table-list'>
            {tables.map(table => (
              <div key={table._id} className={`table-item ${table.status ? 'available' : 'occupied'}`}>
                <h3>Table No: {table.tno}</h3>
                <p>Status: {table.status ? 'Available' : 'Occupied'}</p>
                
                {!table.status && (
                  <>
                    <div className='orders-list'>
                      <h4>Orders:</h4>
                      <ul>
                        {table.orders.map((order, index) => (
                          <li key={index}>
                            {order.dish} (Qty: {order.quantity}) - ₹{order.price}
                          </li>
                        ))}
                      </ul>
                      <p className='total'>Total: ₹{table.total}</p>
                    </div>
                    <button 
                      className='mark-available'
                      onClick={() => markAsAvailable(table._id)}
                    >
                      Mark as Available
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <br/><br/><br/>
    </div>
  );
};

export default Bookings;