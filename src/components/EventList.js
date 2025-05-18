import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events }) => {
  return (
    <div>
      <h2>Upcoming EventLists</h2>
      <div className="event-list">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
