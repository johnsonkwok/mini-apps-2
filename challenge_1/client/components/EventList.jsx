import React from 'react';
import Event from './Event.jsx';

const EventList = ({ events }) => (
  <div className="list">
    {events.map((event) => (
      <Event event={event} />
    ))}
  </div>
);

export default EventList;
