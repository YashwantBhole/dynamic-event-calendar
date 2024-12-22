import React from "react";
import { EventProvider } from "./context/EventContext";
import CalendarGrid from "./components/CalendarGrid";

const App = () => {
  return (
    <EventProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold">Dynamic Event Calendar</h1>
        <CalendarGrid />
      </div>
    </EventProvider>
  );
};

export default App;