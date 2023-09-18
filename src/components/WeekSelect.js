import React, { useState } from "react";

function WeekSelect(props) {
  // Generate an array of week options for the select element
  const generateWeekOptions = () => {
    const options = [];
    const today = new Date();
    const currentWeek = getWeekNumber(today);

    for (let i = 0; i < 5; i++) {
      // Generate options for the current week and the four previous weeks
      const weekStartDate = new Date(today);
      weekStartDate.setDate(today.getDate() - today.getDay() - i * 7);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);

      // Find the start of the week (Monday) and end of the week (Sunday)
      weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay() + 1);
      weekEndDate.setDate(weekEndDate.getDate() - weekEndDate.getDay() + 7);

      const weekLabel = `Week ${currentWeek - i}: ${formatDates(weekStartDate)} - ${formatDates(weekEndDate)}`;

      const originalDate = new Date(weekEndDate);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with 0 if needed
      const day = String(originalDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      // console.log(formattedDate);

      options.push(
        <option key={i} value={formattedDate}>
          {weekLabel}
        </option>
      );
    }

    return options;
  };

  const [selectedWeek, setSelectedWeek] = useState(""); // State to store the selected week

  // Helper function to get the week number of a date
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  };

  // Helper function to format a date as "YYYY-MM-DD"
  const formatDates = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle the change event when the user selects a week
  const handleWeekSelect = (e) => {
    setSelectedWeek(e.target.value);
  };


  // date array
  function DateArray(eventDate) {
    let array = [];
    let date = eventDate
    let MyDateAfter = new Date(date);
    let MyDateStringAfter;

    for (let i = 0; i < 6; i++) {
      MyDateAfter.setDate(MyDateAfter.getDate() - 1);
      MyDateStringAfter =
        MyDateAfter.getFullYear() +
        "-" +
        ("0" + (MyDateAfter.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + MyDateAfter.getDate()).slice(-2);
      array.push(MyDateStringAfter); // Add the date to the array
    }
    array.unshift(date)
    return array; // Return the generated array of dates
  }

  console.log(selectedWeek, "selectedWeek")

  const result = DateArray(selectedWeek);
  console.log(result, "selected result")


  return (
    <div>
      <label>Select a Week:</label>
      <select value={selectedWeek} onChange={handleWeekSelect}>
        <option value="">Select a week</option>
        {generateWeekOptions()}
      </select>
      {selectedWeek && <p>You selected Week {selectedWeek}</p>}
    </div>
  );
}

export default WeekSelect;
