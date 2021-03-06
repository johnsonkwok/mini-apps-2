import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ chartData }) => {
  const labels = Object.keys(chartData);
  const values = Object.values(chartData);
  const options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Dates'
      }}],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Closing Price ($ USD)'
        }
      }]
    }
  };
  const data = {
    labels: labels,
    datasets: [{
      label: 'Bitcoin (BTC) Price',
      backgroundColor: 'rgba(96,158,160,0.5)',
      borderColor: 'darkblue',
      data: values    
    }]
  }
  return (
    <div>
      <Line data={data} height={500} options={options} />
    </div>
  );
};

export default Chart;