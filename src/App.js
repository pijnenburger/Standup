/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";
import { useCookies } from "react-cookie";

import Standup from "./components/Standup";

const initialTime = 60;
const initialParticipants = [
  {
    id: crypto.randomUUID(),
    name: "Maria",
    selected: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Pablo",
    selected: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Timon",
    selected: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Mikel",
    selected: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Franco",
    selected: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Amin",
    selected: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Michiel",
    selected: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Favio",
    selected: true,
  },
  {
    id: crypto.randomUUID(),
    name: "Rick",
    selected: true,
  },
];

function App() {
  const [cookies, setCookie] = useCookies(["saved-participants"]);
  const savedParticipants = cookies["saved-participants"];
  const defaultParticipants = savedParticipants || initialParticipants;

  return (
    <div className="App">
      <header>
        <h1>Daily Standup</h1>
      </header>
      <main>
        <Standup
          initialParticipants={defaultParticipants}
          initialTime={initialTime}
          setCookie={setCookie}
        />
      </main>
    </div>
  );
}

export default App;
