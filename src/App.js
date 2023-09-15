/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";
import { useCookies } from "react-cookie";
import Standup from "./components/Standup";
import { ResetIcon } from "@radix-ui/react-icons";
import { generateParticipant } from "./helpers/utils";

const initialTime = 60;
const initialParticipants = [
  "Maria",
  "Pablo",
  "Timon",
  "Mikel",
  "Franco",
  "Amin",
  "Michiel",
  "Favio",
  "Rick",
].map(generateParticipant);

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["saved-participants"]);
  const savedParticipants = cookies["saved-participants"];
  const defaultParticipants = savedParticipants || initialParticipants;

  return (
    <div className="App">
      <header>
        <div className="headerContainer">
          <h1>Daily Standup</h1>
          <button
            onClick={() => {
              removeCookie(["saved-participants"]);
              window.location.reload();
            }}
          >
            <ResetIcon color="var(--slate-10)" width="24" height="24" />
          </button>
        </div>
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
