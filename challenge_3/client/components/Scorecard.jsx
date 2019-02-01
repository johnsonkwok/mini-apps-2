import React from 'react';

const createHeader = (ball, key) => {
  return <th key={key}>{'Ball ' + `${ball}`}</th>;
}

const createRow = (frame, score1, score2, key, score3) => {
  return (
    <tr key={key}>
      <th>Frame {frame}</th>
      <td>{score1}</td>
      <td>{score2}</td>
      <td>{score3}</td>
    </tr>
  );
};

const Scorecard = ({ score }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
            {Array(3).fill(0).map((header, idx) => {
              return createHeader(idx + 1, idx);
            })}
        </tr>
      </thead>
      <tbody>
        {Array(10).fill(0).map((row, idx) => {
          return createRow(idx + 1, score[idx + 1][0], score[idx + 1][1], idx, score[idx + 1][2]);
        })}
      </tbody>
    </table>
  );
};

export default Scorecard;