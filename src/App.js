import React, { useState, useEffect } from "react";
import "./App.css";
import { useCookies } from "react-cookie";
import { generateParticipant } from "./helpers/utils";
import { shuffleArray } from "./helpers/utils";

import Standup from "./components/Standup";
import StandupSettings from "./components/StandupSettings";

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
  const [cookies, setCookie] = useCookies(["saved-participants"]);
  const savedParticipants = cookies["saved-participants"];
  const defaultParticipants = savedParticipants || initialParticipants;

  // State related to participants
  const [participants, setParticipants] = useState(defaultParticipants);
  const [standupStatus, setStandupStatus] = useState("idle");
  const [shuffledParticipants, setShuffledParticipants] =
    useState(defaultParticipants);
  const [currentParticipant, setCurrentParticipant] = useState(null);
  const [finishedParticipants, setFinishedParticipants] = useState([]);
  const [timer, setTimer] = useState(initialTime);

  // Functions to manipulate participants
  const toggleParticipantSelection = (id) => {
    const updatedParticipants = participants.map((participant) =>
      participant.id === id
        ? { ...participant, selected: !participant.selected }
        : participant
    );
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);
  };

  const handleParticipantChange = ({ id, value }) => {
    const updatedParticipants = participants.map((participant) =>
      participant.id === id ? { ...participant, name: value } : participant
    );
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);
  };

  const startStandup = () => {
    const selectedParticipants = participants.filter(
      (participant) => participant.selected && participant.name.trim() !== ""
    );

    if (selectedParticipants.length === 0) {
      // Handle the case where no participants are selected or have empty names.
      return;
    }

    const shuffledPeople = shuffleArray(selectedParticipants);

    // Update the state variables
    setFinishedParticipants([]);
    setTimer(initialTime);
    setStandupStatus("running");
    setShuffledParticipants(shuffledPeople);
    setCurrentParticipant(shuffledPeople[0]);
  };

  const updateCookies = (value) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365); // Add one day
    setCookie("saved-participants", value, {
      expires: expirationDate,
    });
  };

  const resetTimer = () => {
    setTimer(initialTime);
  };

  // Function to pause the standup
  const restartStandup = () => {
    setStandupStatus("idle");
    setFinishedParticipants([]);
  };

  // Function to pause the standup
  const togglePause = () => {
    if (standupStatus === "running") {
      setStandupStatus("pause");
    } else {
      setStandupStatus("running");
    }
  };

  // Function to move to the next participant
  const nextParticipant = () => {
    if (standupStatus !== "running") {
      setStandupStatus("running");
    }
    const currentIndex = shuffledParticipants.indexOf(currentParticipant);
    if (currentIndex === shuffledParticipants.length - 1) {
      // All participants have finished
      setStandupStatus("finished");
    } else {
      setCurrentParticipant(shuffledParticipants[currentIndex + 1]);
      resetTimer();
    }
  };

  // Add current participant to finished participants
  useEffect(() => {
    if (currentParticipant) {
      setFinishedParticipants((prevFinishedParticipants) => [
        ...prevFinishedParticipants,
        currentParticipant,
      ]);
    }
  }, [currentParticipant]);

  // Function to handle the timer tick
  useEffect(() => {
    let intervalId;
    if (standupStatus === "running") {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (standupStatus === "pause") {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [standupStatus]);

  // Handle when timer hits 0
  useEffect(() => {
    if (timer === 0) {
      setStandupStatus("pause");
    }
  }, [timer]);

  return (
    <div className="App">
      <div className="sidebar">
        <StandupSettings
          standupStatus={standupStatus}
          startStandup={startStandup}
          participants={participants}
          setParticipants={setParticipants}
          finishedParticipants={finishedParticipants}
          toggleParticipantSelection={toggleParticipantSelection}
          handleParticipantChange={handleParticipantChange}
          updateCookies={updateCookies}
        />
      </div>
      <main className="main-content">
        <Standup
          standupStatus={standupStatus}
          setStandupStatus={setStandupStatus}
          timer={timer}
          currentParticipant={currentParticipant}
          restartStandup={restartStandup}
          togglePause={togglePause}
          nextParticipant={nextParticipant}
        />
      </main>
    </div>
  );
}

export default App;
