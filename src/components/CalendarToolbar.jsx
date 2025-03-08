import React from 'react';

const CalendarToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  const viewButtons = toolbar.views.map(view => {
    const viewName = view.charAt(0).toUpperCase() + view.slice(1);
    return (
      <button
        key={view}
        type="button"
        className={toolbar.view === view ? 'rbc-active' : ''}
        onClick={() => toolbar.onView(view)}
      >
        {viewName}
      </button>
    );
  });

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToCurrent}>Today</button>
        <button type="button" onClick={goToBack}>Back</button>
        <button type="button" onClick={goToNext}>Next</button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <span className="rbc-btn-group">{viewButtons}</span>
    </div>
  );
};

export default CalendarToolbar;
