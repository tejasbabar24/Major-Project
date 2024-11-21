import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'; // Correct import for the React wrapper

function DonutChart({ myAttendance, selectedClassDates }) {
  const [lecturesCount, setLecturesCount] = useState(0);

  // Function to count the number of "Present" entries in the myAttendance array
  const countAttendance = (attendanceArray) => {
    return attendanceArray.filter((item) => item.status === 'Present').length;
  };

  useEffect(() => {
    if (myAttendance && myAttendance.length > 0) {
      const presentCount = countAttendance(myAttendance);
      setLecturesCount(presentCount); // Set the lecturesCount to the present count
    }
  }, [myAttendance]);

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
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
      },
    },
    responsive: [
      {
        breakpoint: 768, // For tablets and smaller devices
        options: {
          chart: {
            width: 280,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 480, // For mobile devices
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  // Assuming selectedClassDates is a count of total class dates
  const series = [lecturesCount, selectedClassDates - lecturesCount]; // Remaining lectures = total - present

  return (
    <div
      id="chart"
      className="bg-white shadow-lg rounded-lg flex items-center justify-center h-full w-full p-4"
    >
      <Chart options={options} series={series} type="donut" width="100%" />
    </div>
  );
}

export default DonutChart;
