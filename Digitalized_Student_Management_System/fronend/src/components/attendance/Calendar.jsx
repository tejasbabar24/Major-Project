import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import base calendar styles
import "./HighlightedCalendar.css"; // Your custom styles

function HighlightedCalendar({ highlightedDates }) {
  // Function to normalize a date to midnight UTC (ignoring time)
  const normalizeDate = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split("T")[0]; // Return the date in YYYY-MM-DD format
  };

  // Function to check if a date should be highlighted
  const isHighlighted = (date) => {
    const formattedDate = normalizeDate(date); // Normalize the date before comparison
    return highlightedDates.includes(formattedDate); // Check if the date is in the highlighted array
  };

  // Function to add a custom class to highlighted tiles
  const tileClassName = ({ date, view }) => {
    if (view === "month" && isHighlighted(date)) {
      return "highlighted-tile"; // Apply custom class to highlighted tiles
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        <Calendar tileClassName={tileClassName} />
      </div>
    </div>
  );
}

export default HighlightedCalendar;
