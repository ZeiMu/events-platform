import React, { useState } from "react";
import NavBar from "./components/NavBar";
import EventList from "./components/EventList";
import dummydata from "./dummydata/events.js";
import LoginPage from "./pages/LoginPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [events] = useState(dummydata);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Welcome to the Event Platfrom</h1>
                <EventList events={events} />
              </>
            }
          />
          <Route path="/staffportal" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
