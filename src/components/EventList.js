import React from "react";
// import EventCard from "./EventCard";

const EventList = ({ events, handleSignUp }) => {
  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <h3>{event.title}</h3>
          <p>
            {event.date} at {event.time}
          </p>
          <p>{event.description}</p>
          <button onClick={() => handleSignUp(event)}>Sign Up</button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
