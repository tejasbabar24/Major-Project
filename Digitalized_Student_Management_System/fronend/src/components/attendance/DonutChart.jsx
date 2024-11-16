import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts"; // Correct import for the React wrapper

function DonutChart({ myAttendance, selectedClassDates }) {
  const [lecturesCount, setLecturesCount] = useState(0);

  // Function to count the number of "Present" entries in the myAttendance array
  const countAttendance = (attendanceArray) => {
    return attendanceArray.filter(item => item.status === 'Present').length;
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
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
  };

  // Assuming selectedClassDates is a count of total class dates
  const series = [lecturesCount, selectedClassDates - lecturesCount]; // Remaining lectures = total - present

  return (
    <div id="chart" className='bg-white shadow-lg rounded-lg h-full w-full'>
      <Chart options={options} series={series} type="donut" width={380} />
    </div>
  );
}

export default DonutChart;
