import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/admin.css';

const Admin = () => {
  const navigate = useNavigate();
  
  return (
    <div className='admin'>
        <h1 className='admin-title'>Welcome to admin page</h1>
        <fieldset>
            <legend>Package Operations</legend>
            <div className='package-crud'>
              <button type="button" className='package-create' onClick={() => navigate('/createpack')}>Create</button>
              <button type="button" className='package-update' onClick={() => navigate('/updatepack')}>Update</button>
              <button type="button" className='package-delete' onClick={() => navigate('/deletepack')}>Delete</button>
              <button type="button" className='package-view' onClick={() => navigate('/viewpack')}>View</button>
            </div>
        </fieldset>
        <br/>
        <fieldset>
          <legend>Booked Packages</legend>
          <div className='package-crud'>
            <button type='button' className='booked-package' onClick={() => navigate('/booking')}>View Bookings</button>
            <button type='button' className='booked-feedback' onClick={() => navigate('/feedback')}>View Reviews</button>
            
           </div>
           <div className='below-btns'>
           <button type='button' className='booked-histories' onClick={() => navigate('/histories')}>View History</button>
           <button 
            type='button' 
            className='booked-histories'
            onClick={() => window.open('https://drive.google.com/file/d/1B7Xw56hYNaFX4dl-EHyAYxjjdwyzwJEd/view?usp=sharing', '_blank', 'noopener,noreferrer')}
            >+
            Generate Report
            </button></div>
        </fieldset>
        <br/><br/>
    </div>
  )
}

export default Admin