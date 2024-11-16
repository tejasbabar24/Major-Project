import React from 'react';
import Chart from "react-apexcharts"; // Correct import for the React wrapper

function DonutChart() {
  const options = {
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
  };

  const series = [44, 55, 41, 17, 15];

  return (
    <div id="chart" className='bg-white shadow-lg rounded-lg h-full w-full'>
      <Chart  options={options} series={series} type="donut" width={380} />
    </div>
  );
}

export default DonutChart;
