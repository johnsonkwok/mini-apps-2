import React from 'react';

const Event = ({ event }) => (
  <div className="event">
    <div>
      {event.category1 === 'By place' ? <span>Place: </span> : <span>Topic:</span>}
      <span>{event.category2}</span>
    </div>
    <div>
      <span>Date: {event.date}</span>
    </div>
    <div>
      <span>Description: {event.description}</span>
    </div>
  </div>
);

export default Event;
