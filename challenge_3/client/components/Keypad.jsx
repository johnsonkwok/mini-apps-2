import React from 'react';

const newBtn = (num, key) => {
  return <button type="button" key={key}>{num}</button>;
}

const Keypad = () => {
  return (
    <div>
      <div>Please select the number of pins hit for the current bowl.</div>
      {Array(10).fill(0).map((btn, idx) => {
        return newBtn(idx + 1, idx);
      })}
    </div>
  );
};

export default Keypad;