import React from 'react';
import Event from './Event.jsx';

const EventList = ({ events }) => (
  <div className="list mb-5">
    {events.map((event, idx) => (
      <Event event={event} key={idx} />
    ))}
  </div>
);

export default EventList;
