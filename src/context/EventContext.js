import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create Context
const EventContext = createContext();

// Reducer for adding and deleting events
const eventReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EVENT":
      const newEventList = [...state.events, action.payload];
      localStorage.setItem("events", JSON.stringify(newEventList)); // Save to localStorage
      return { events: newEventList };
    case "DELETE_EVENT":
      const filteredEvents = state.events.filter(
        (event) => event.id !== action.payload
      );
      localStorage.setItem("events", JSON.stringify(filteredEvents)); // Save to localStorage
      return { events: filteredEvents };
    case "LOAD_EVENTS":
      return { events: action.payload }; // Load from localStorage
    default:
      return state;
  }
};

// EventProvider to wrap the app and provide event context
export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, { events: [] });

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      dispatch({ type: "LOAD_EVENTS", payload: storedEvents });
    }
  }, []);

  return (
    <EventContext.Provider value={{ events: state.events, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to access EventContext
export const useEventContext = () => useContext(EventContext);
