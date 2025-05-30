import React from "react";
import EventList from "../components/EventList";
import events from "../dummydata/events";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Event Platform</h1>
      <EventList events={events} />
    </div>
  );
};

export default HomePage;
