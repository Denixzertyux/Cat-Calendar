import localforage from 'localforage';

// Initialize localforage
localforage.config({
  name: 'girlfriend-calendar',
  storeName: 'events'
});

const EVENTS_STORE = 'calendar-events';

export const getEvents = async () => {
  try {
    const events = await localforage.getItem(EVENTS_STORE);
    return events || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const saveEvent = async (event) => {
  try {
    const events = await getEvents();
    const newEvent = {
      ...event,
      id: event.id || Date.now().toString(), // Generate ID if new
    };
    
    const updatedEvents = event.id 
      ? events.map(e => e.id === event.id ? newEvent : e)
      : [...events, newEvent];
      
    await localforage.setItem(EVENTS_STORE, updatedEvents);
    return newEvent;
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const events = await getEvents();
    const updatedEvents = events.filter(e => e.id !== eventId);
    await localforage.setItem(EVENTS_STORE, updatedEvents);
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
