import React from 'react';

const renderedDate = (date) => {
  // handle B.C. years
  if (date < 0) {
    return Math.abs(date) + ' B.C.';
  }
  // handle dates in yyyy/mm/dd format
  const newDate = new Date(date);
  if (!isNaN(newDate.getTime())) {
      return newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
  } else {
    return date + ' A.D.';
  }
}

const Event = ({ event }) => (
  <div className="event">
    <div>
      {event.category1 === 'By place' ? <span><strong>Place: </strong></span> : null}
      {event.category1 === 'By topic' ? <span><strong>Topic: </strong></span> : null}
      <span>{event.category2 || null}</span>
    </div>
    <div>
      <span><strong>Date: </strong>{renderedDate(event.date)}</span>
    </div>
    <div>
      <span><strong>Description: </strong>{event.description}</span>
    </div>
    <hr />
  </div>
);

export default Event;
