import React, { useState } from "react";
import { format, addMonths, subMonths, isToday } from "date-fns";
import { generateCalendar, isSameDay } from "../utils/dateUtils";
import { useEventContext } from "../context/EventContext";
import EventListPanel from "./EventListPanel";
import EventModal from "./EventModal";

const CalendarGrid = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const { events } = useEventContext();

  const days = generateCalendar(currentDate);

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setIsModalOpen(true); // Open modal when date is clicked
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-lg sm:text-xl font-semibold text-gray-800">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="text-blue-500 hover:text-blue-600 transition duration-300 mb-2 sm:mb-0"
          aria-label="Previous Month"
        >
          &lt; Previous
        </button>
        <h2 className="text-2xl font-bold text-gray-700">{format(currentDate, "MMMM yyyy")}</h2>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="text-blue-500 hover:text-blue-600 transition duration-300"
          aria-label="Next Month"
        >
          Next &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4 text-center">
        {/* Weekday Labels */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div
            key={index}
            className="font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}

        {/* Days */}
        {days.map((day, index) => {
          const isWeekend = day.getDay() === 0 || day.getDay() === 6; // Sunday or Saturday
          const isSelected = isSameDay(day, selectedDate);
          const isCurrent = isToday(day);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)} // Open modal on date click
              className={`p-2 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
                isWeekend
                  ? "text-red-500" // Weekend days in red
                  : "text-gray-700" // Weekdays in default color
              } ${
                isSelected
                  ? "bg-blue-400 text-white scale-105" // Selected day styling
                  : isCurrent
                  ? "bg-green-400 text-white scale-105" // Current day styling
                  : "hover:bg-blue-300"
              } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              aria-label={`Select date ${format(day, "d MMMM yyyy")}`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>

      {/* Event List */}
      <EventListPanel selectedDate={selectedDate} />

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen} // Pass modal open state
        onClose={() => setIsModalOpen(false)} // Close modal function
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarGrid;
