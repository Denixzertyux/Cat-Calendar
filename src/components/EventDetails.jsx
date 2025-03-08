import React from 'react';
import moment from 'moment';
import '../styles/EventDetails.css';

function EventDetails({ event, onEdit, onDelete, onClose }) {
  return (
    <div className="event-details" style={{ borderLeft: `5px solid ${event.color || '#c8bca8'}` }}>
      <h2>{event.title}</h2>
      
      <div className="detail-row">
        <span className="detail-label">Start:</span>
        <span className="detail-value">{moment(event.start).format('MMMM D, YYYY h:mm A')}</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">End:</span>
        <span className="detail-value">{moment(event.end).format('MMMM D, YYYY h:mm A')}</span>
      </div>
      
      {event.location && (
        <div className="detail-row">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{event.location}</span>
        </div>
      )}
      
      {event.description && (
        <div className="detail-row">
          <span className="detail-label">Description:</span>
          <p className="detail-value description">{event.description}</p>
        </div>
      )}
      
      <div className="detail-actions">
        <button className="btn btn-primary" onClick={() => onEdit(event)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(event.id)}>Delete</button>
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EventDetails;
