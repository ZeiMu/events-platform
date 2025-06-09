import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import dummydata from "./dummydata/events.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { gapi } from "gapi-script";
import "./App.css";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [events, setEvents] = useState(dummydata);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUpEvents, setSignUpEvents] = useState([]);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: "https://www.googleapis.com/auth/calendar.events",
        })
        .then(() => gapi.client.load("calendar", "v3"))
        .then(() => {
          console.log("Google Calendar Api");
        })
        .catch((error) => {
          console.error("Error loading API", error);
        });
    }

    gapi.load("client:auth2", () => {
      console.log("Google API loaded");
      start();
    });
  }, []);

  const STAFF_EMAIL = "staff@email.com"; // caps lock as value does not change
  const STAFF_PASSWORD = "staffpassword";

  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);

  const handleLogin = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      console.log("Logged in:", googleUser.getBasicProfile().getName());
      setIsLoggedIn(true);
    });
  };

  const handleAddToCalendar = (event) => {
    if (!event || !event.title || !event.date || !event.time) {
      console.error("Event is unavailable", event);
      alert("Unable to add event to calendar");
    }
    const eventDetails = {
      summary: event.title,
      description: event.description || "no description",
      start: {
        dateTime: new Date(`${event.date}T${event.time}`).toISOString(),
        timeZone: "BST",
      },
      end: {
        dateTime: new Date(
          new Date(`${event.date}T${event.time}`).getTime() + 60 * 60 * 1000
        ).toISOString(),
        timeZone: "BST",
      },
    };

    gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        resource: eventDetails,
      })
      .then((response) => {
        alert("Event added to Google Calendar");
        console.log(response);
      });
  };

  const handleSignUp = (event) => {
    if (!signUpEvents.includes(event.id)) {
      setSignUpEvents([...signUpEvents, event.id]);
      alert(`Signed up for ${event.title}`);
      handleAddToCalendar(event);
    } else {
      alert("You've signed up for this event");
    }
  };

  const handleStaffLogin = (e) => {
    e.preventDefault();
    if (staffEmail === STAFF_EMAIL && staffPassword === STAFF_PASSWORD) {
      setIsStaffLoggedIn(true);
    } else {
      alert(
        "Incorrect staff login. email is staff@email.com and password is staffpassword"
      );
    }
  };
  return (
    <Router>
      <div className="App">
        <NavBar />
        <h1>Event Platform</h1>
        {!isLoggedIn && (
          <button onClick={handleLogin}>Login with Google</button>
        )}
        <Routes>
          <Route
            path="/"
            element={<EventList events={events} handleSignUp={handleSignUp} />}
          />
          <Route
            path="/staffportal"
            element={
              isStaffLoggedIn ? (
                <EventForm
                  addEvent={(newEvent) => {
                    const eventWithId = { ...newEvent, id: Date.now() };
                    setEvents([...events, eventWithId]);
                    handleAddToCalendar(eventWithId);
                  }}
                />
              ) : (
                <form onSubmit={handleStaffLogin}>
                  <h2>Staff Login</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={staffPassword}
                    onChange={(e) => setStaffPassword(e.target.value)}
                    required
                  />
                  <button type="submit">login</button>
                  <p>
                    (HINT: email is staff@email.com and password is
                    staffpassword)
                  </p>
                </form>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
