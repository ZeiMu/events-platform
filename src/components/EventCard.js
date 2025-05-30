import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.date} at {event.time} </p>
      <p>{event.description}</p>
      <button>Sign Up</button>
    </div>
  );
};

export default EventCard;
