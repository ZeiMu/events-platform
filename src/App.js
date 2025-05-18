import React, { useState } from "react";
import NavBar from "./components/NavBar";
import EventList from "./components/EventList";
import dummydata from "./dummydata/events";

function App() {
  const [events] = useState(dummydata);

  return (
    <div className="App">
      <NavBar />
      <h1>Welcome to the Event Platfrom</h1>
      <EventList events={events} />
    </div>
  );
}

export default App;
