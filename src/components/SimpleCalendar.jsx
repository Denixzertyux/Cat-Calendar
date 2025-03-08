import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getEvents, saveEvent, deleteEvent } from '../services/eventStorage';
import EventForm from './EventForm';
import EventDetails from './EventDetails';
import '../styles/SimpleCalendar.css';

const localizer = momentLocalizer(moment);

// Array to store cat image URLs
const catImages = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=150',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=150',
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=150',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=150',
  // Add more cat URLs as needed
];

function SimpleCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  
  useEffect(() => {
    loadEvents();
  }, []);
  
  const loadEvents = async () => {
    const storedEvents = await getEvents();
    const formattedEvents = storedEvents.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }));
    setEvents(formattedEvents);
  };
  
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setCurrentEvent(event);
    setShowEventDetails(true);
  };
  
  const handleSelectSlot = ({ start, end }) => {
    setCurrentEvent({
      title: '',
      start,
      end,
      description: '',
      location: '',
      color: '#c8bca8'
    });
    setShowEventForm(true);
  };

  const handleSaveEvent = async (savedEvent) => {
    await saveEvent(savedEvent);
    setShowEventForm(false);
    loadEvents();
  };

  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);
    setShowEventDetails(false);
    loadEvents();
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setShowEventForm(true);
    setShowEventDetails(false);
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };
  
  return (
    <div className="simple-calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 100px)' }}
        date={currentDate}
        view={currentView}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        views={['month', 'week', 'day', 'agenda']}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color || '#c8bca8',
          },
        })}
      />
      
      {showEventForm && (
        <div className="modal">
          <div className="modal-content">
            <EventForm 
              event={currentEvent} 
              onSave={handleSaveEvent} 
              onCancel={() => setShowEventForm(false)} 
            />
          </div>
        </div>
      )}
      
      {showEventDetails && (
        <div className="modal">
          <div className="modal-content">
            <EventDetails 
              event={currentEvent}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              onClose={() => setShowEventDetails(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SimpleCalendar;
