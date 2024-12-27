import React from "react";
import { EventProvider } from "./context/EventContext";
import CalendarGrid from "./components/CalendarGrid";

const App = () => {
  return (
    <EventProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-center text-4xl font-bold">
          <span className="text-blue-600">Calendar</span>
          <span className="text-orange-500 ml-2">Ease</span>
        </h1>
        <CalendarGrid />
      </div>
    </EventProvider>
  );
  
};

export default App;
