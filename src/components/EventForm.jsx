import React, { useState } from 'react';
import moment from 'moment';
import '../styles/EventForm.css';

function EventForm({ event, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: event?.id || null,
    title: event?.title || '',
    start: event?.start || new Date(),
    end: event?.end || new Date(),
    description: event?.description || '',
    location: event?.location || '',
    color: event?.color || '#c8bca8'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: new Date(value) }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>{event?.id ? 'Edit Event' : 'Add New Event'}</h2>
      
      <div className="form-group">
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label>Start Date/Time</label>
        <input 
          type="datetime-local" 
          name="start" 
          value={moment(formData.start).format('YYYY-MM-DDTHH:mm')} 
          onChange={handleDateChange} 
          required 
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label>End Date/Time</label>
        <input 
          type="datetime-local" 
          name="end" 
          value={moment(formData.end).format('YYYY-MM-DDTHH:mm')} 
          onChange={handleDateChange} 
          required 
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label>Location</label>
        <input 
          type="text" 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label>Color</label>
        <input 
          type="color" 
          name="color" 
          value={formData.color} 
          onChange={handleChange} 
          className="form-control color-picker"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save Event</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EventForm;
