import React from "react";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event created", { title, description, date, time });

    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />{" "}
      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />{" "}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />{" "}
      <br />{" "}
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />{" "}
      <br /> <button type="submit">Create Event</button>{" "}
    </form>
  );
};

export default EventForm;
