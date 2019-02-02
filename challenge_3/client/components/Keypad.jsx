import React from 'react';

const newBtn = (num, key, addPoints) => {
  return <button type="button" key={key} value={num} onClick={addPoints}>{num}</button>;
}

const Keypad = ({ addPoints }) => {
  return (
    <div className="keypad">
      <div>Please select the number of pins hit for the current bowl.</div>
      {Array(10).fill(0).map((btn, idx) => {
        return newBtn(idx + 1, idx, addPoints);
      })}
    </div>
  );
};

export default Keypad;