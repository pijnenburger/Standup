/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";

import Standup from "./components/Standup";

const initialTime = 60;
const initialParticipants = [
  { id: crypto.randomUUID(), name: "John", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Fred", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Hans", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Anne", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Tonny", avatar: "...", selected: true },
];

function App() {
  return (
    <div className="App">
      <h1>Daily Standup</h1>
      <Standup
        initialParticipants={initialParticipants}
        initialTime={initialTime}
      />
    </div>
  );
}

export default App;
