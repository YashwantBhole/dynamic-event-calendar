import React from "react";
import { useEventContext } from "../context/EventContext";
import { isSameDay } from "../utils/dateUtils";

const EventListPanel = ({ selectedDate }) => {
  const { events, dispatch } = useEventContext();

  const filteredEvents = events.filter((event) =>
    isSameDay(new Date(event.date), selectedDate)
  );

  return (
    <div className="mt-4 p-6 bg-white rounded-lg shadow-md border">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Events for {selectedDate.toDateString()}
      </h3>
      {filteredEvents.length === 0 ? (
        <p className="text-gray-500">No events for this day</p>
      ) : (
        <ul>
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              className="mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <div>
                <strong className="text-lg">{event.name}</strong>
                <span className="text-sm text-gray-500"> ({event.startTime} - {event.endTime})</span>
                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>
              <button
                onClick={() => dispatch({ type: "DELETE_EVENT", payload: event.id })}
                className="mt-2 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label={`Delete event: ${event.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventListPanel;
