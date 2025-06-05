import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import dummydata from "./dummydata/events.js";
import LoginPage from "./pages/LoginPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "621653517606-qkqvv9k0f8usc6viahqtdnp4focdt6pc.apps.googleusercontent.com";
function App() {
  const [events, setEvents] = useState(dummydata);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUpEvents, setSignUpEvents] = useState([]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "621653517606-qkqvv9k0f8usc6viahqtdnp4focdt6pc.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/calendar.events",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

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
              isLoggedIn ? (
                <EventForm
                  addEvent={(newEvent) => {
                    setEvents([...events, newEvent]);
                    handleAddToCalendar(newEvent);
                  }}
                />
              ) : (
                <p>Login to create events</p>
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
