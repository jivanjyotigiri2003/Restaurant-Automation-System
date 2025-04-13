import React, { useEffect, useState } from 'react';

const Histories = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);

  // Load reports from localStorage
  useEffect(() => {
    const storedHistories = JSON.parse(localStorage.getItem('histories')) || [];
    setReports(storedHistories);
    setFilteredReports(storedHistories);
  }, []);

  // Initialize sample data (optional)
  const initializeSampleData = () => {
    const sampleReports = [
      {
        _id: '1',
        name: 'Jivan Jyoti Giri',
        email_id: 'jivanjyotigiri2003@gmail.com',
        date: new Date().toISOString(),
        time: '19:30',
        tableNo: 5,
        total: 1500,
        orders: [
          { quantity: 2, dish: 'Pizza', price: 500 },
          { quantity: 1, dish: 'Pasta', price: 300 }
        ]
      },
      {
        _id: '2',
        name: 'Jivan Jyoti Giri',
        email_id: 'jivanjyotigiri2003@gmail.com',
        date: new Date().toISOString(),
        time: '14:30',
        tableNo: 3,
        total: 2700,
        orders: [
          { quantity: 4, dish: 'Pizza', price: 500 },
          { quantity: 1, dish: 'Pasta', price: 700 }
        ]
      }
    ];
    
    localStorage.setItem('histories', JSON.stringify(sampleReports));
    setReports(sampleReports);
    setFilteredReports(sampleReports);
  };

  const filterReports = () => {
    if (!searchTerm) {
      setFilteredReports(reports);
      return;
    }

    const lowerCasedTerm = searchTerm.toLowerCase();
    const filtered = reports.filter((report) => {
      const reportDate = new Date(report.date).toLocaleDateString();
      return (
        report.name.toLowerCase().includes(lowerCasedTerm) ||
        report.email_id.toLowerCase().includes(lowerCasedTerm) ||
        reportDate.includes(lowerCasedTerm)
      );
    });

    setFilteredReports(filtered);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='histories'>
      <div className='hist-searchbox'>
        <input
          type='text'
          className='search-input'
          placeholder='Search by name, email, or date...'
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {reports.length === 0 && (
        <div className='no-histories'>
          <p>No booking history found</p>
          <button onClick={initializeSampleData}>Load Sample Data</button>
        </div>
      )}

      <h1 className='hist-title'>Booking History</h1>
      <br /><br />
      
      <div className="reports-list">
        {filteredReports.map((report) => (
          <div key={report._id} className="reports-item">
            <div className='reports-first'>
              <p><strong>Name:</strong> {report.name}</p>
              <p><strong>Email:</strong> {report.email_id}</p>
              <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {report.time}</p>
              <p><strong>Table No:</strong> {report.tableNo}</p>
              <p><strong>Total:</strong> ₹ {report.total}</p>
            </div>
            <div className='reports-last'>
              <p><strong>Orders:</strong></p>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Dish</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {report.orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.quantity}</td>
                      <td>{order.dish}</td>
                      <td>₹ {order.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Histories;