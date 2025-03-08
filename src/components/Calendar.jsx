import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getEvents, saveEvent, deleteEvent } from '../services/eventStorage';
import EventForm from './EventForm';
import EventDetails from './EventDetails';
import CalendarToolbar from './CalendarToolbar';
import '../styles/Calendar.css';

const localizer = momentLocalizer(moment);

const CustomDayCell = ({ children, value }) => {
  const catImages = [
 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=150',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=150',
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=150',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=150',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=150',
  'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=150',
  'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=150',
  'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=150',
  'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=150',
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=150',
  'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=150',
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=150',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=150',
  'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=150',
  'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=150',
  'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=150',
  'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=150',
  'https://images.unsplash.com/photo-1507984211203-76701d7bb120?w=150',
  'https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=150',
  'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=150',
  'https://images.unsplash.com/photo-1527416876370-fb74d128c3dc?w=150',
  'https://images.unsplash.com/photo-1516978101789-720eacb59e79?w=150',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=150',
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=150',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=150',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=150',
  'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=150',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=150',
  'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=150',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=150'
  ];

  const randomCatImage = catImages[value.getDate() % catImages.length]; // Cycle through images based on the day

  return (
    <div className="custom-day-wrapper">
      <div className="day-content">{children}</div>
      <img
        src={randomCatImage}
        alt="Cat"
        className="day-cat-image-corner"
      />
    </div>
  );
};

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const storedEvents = await getEvents();
    const formattedEvents = storedEvents.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
    setEvents(formattedEvents);
  };

  const handleSelectEvent = event => {
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
      color: '#c8bca8',
    });
    setShowEventForm(true);
  };

  const handleSaveEvent = async savedEvent => {
    await saveEvent(savedEvent);
    setShowEventForm(false);
    loadEvents();
  };

  const handleDeleteEvent = async eventId => {
    await deleteEvent(eventId);
    setShowEventDetails(false);
    loadEvents();
  };

  const handleEditEvent = event => {
    setCurrentEvent(event);
    setShowEventForm(true);
    setShowEventDetails(false);
  };

  // Navigation handlers
  const goToNext = () => {
    setCurrentDate(moment(currentDate).add(1, view === 'month' ? 'months' : view === 'week' ? 'weeks' : 'days').toDate());
  };

  const goToPrevious = () => {
    setCurrentDate(moment(currentDate).subtract(1, view === 'month' ? 'months' : view === 'week' ? 'weeks' : 'days').toDate());
  };

  return (
    <div className="calendar-container">
      <div className="calendar-toolbar">
        <button onClick={goToPrevious}>Previous</button>
        <button onClick={goToNext}>Next</button>
        <button onClick={() => setView('month')}>Month</button>
        <button onClick={() => setView('week')}>Week</button>
        <button onClick={() => setView('day')}>Day</button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={date => setCurrentDate(date)}
        view={view}
        onView={newView => setView(newView)}
        style={{ height: 'calc(100vh - 100px)' }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        views={['month', 'week', 'day']}
        components={{ dateCellWrapper: CustomDayCell }}
        eventPropGetter={event => ({
          style: { backgroundColor: event.color || '#3174ad', zIndex: 2 },
        })}
      />

      {showEventForm && (
        <div className="modal">
          <div className="modal-content">
            <EventForm event={currentEvent} onSave={handleSaveEvent} onCancel={() => setShowEventForm(false)} />
          </div>
        </div>
      )}

      {showEventDetails && (
        <div className="modal">
          <div className="modal-content">
            <EventDetails event={currentEvent} onEdit={handleEditEvent} onDelete={handleDeleteEvent} onClose={() => setShowEventDetails(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;