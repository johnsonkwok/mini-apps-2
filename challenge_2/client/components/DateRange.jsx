import React from 'react';

const DateRange = ({ handleChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input className="date-input" type="date" name="startDate" placeholder="mm/dd/yyyy" onChange={handleChange} required={true} />
        </label>
        <label>
          End Date:
          <input className="date-input" type="date" name="endDate" placeholder="mm/dd/yyyy" onChange={handleChange} max={(new Date()).toISOString().split('T')[0]} required={true} />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default DateRange;