import React, { useState, useEffect } from 'react';
import './adminfunctions.css';

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  // Load feedback from localStorage
  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
    setFeedbackList(storedFeedback);
  }, []);

  // Initialize sample feedback data
  const initializeSampleFeedback = () => {
    const sampleData = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Great service and delicious food!',
        date: new Date().toISOString()
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'The app could use some UI improvements',
        date: '2023-07-15T12:00:00Z'
      }
    ];
    
    localStorage.setItem('feedback', JSON.stringify(sampleData));
    setFeedbackList(sampleData);
  };

  return (
    <div className='feedback'>
      <h1 className='feedback-hdr'>Customer Feedback</h1>
      
      {feedbackList.length === 0 && (
        <div className="no-feedback">
          <p>No feedback available</p>
          <button 
            onClick={initializeSampleFeedback}
            className="sample-feedback-btn"
          >
            Load Sample Feedback
          </button>
        </div>
      )}

      <div className="feedback-list">
        {feedbackList.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <div className="feedback-header">
              <h3>{feedback.name}</h3>
              <p className="feedback-email">{feedback.email}</p>
            </div>
            <p className="feedback-message">{feedback.message}</p>
            <div className="feedback-footer">
              <span className="feedback-date">
                {new Date(feedback.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;