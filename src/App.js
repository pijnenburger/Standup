/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";

import Standup from "./components/Standup";

const initialTime = 60;
const initialParticipants = [
  { id: crypto.randomUUID(), name: "Maria", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Pablo", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Timon", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Mikel", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Franco", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Amin", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Michiel", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Favio", avatar: "...", selected: true },
  { id: crypto.randomUUID(), name: "Rick", avatar: "...", selected: true },
];

function App() {
  return (
    <div className="App">
      <header>
        <h1>Daily Standup</h1>
      </header>
      <main>
        <Standup
          initialParticipants={initialParticipants}
          initialTime={initialTime}
        />
      </main>
    </div>
  );
}

export default App;
