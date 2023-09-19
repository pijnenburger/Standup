import React, { useState, useEffect } from "react";
import "./App.css";
import { useCookies } from "react-cookie";
import { generateParticipant, shuffleArray } from "./helpers/utils";

import StandupView from "./components/StandupView";
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
  // Cookies
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

  // State related to timer
  const [defaultTime, setDefaultTime] = useState(initialTime);
  const [timer, setTimer] = useState(defaultTime);

  const startStandup = () => {
    const selectedParticipants = participants.filter(
      (participant) => participant.selected && participant.name.trim() !== ""
    );
    if (selectedParticipants.length === 0) {
      return;
    }
    // Update the state variables
    setFinishedParticipants([]);
    setTimer(defaultTime);
    setStandupStatus("running");
    const shuffledPeople = shuffleArray(selectedParticipants);
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
    setTimer(defaultTime);
  };

  // Function to restart the standup
  const restartStandup = () => {
    setStandupStatus("idle");
    setFinishedParticipants([]);
  };

  // Function to pause the standup
  const togglePause = () => {
    if (timer <= 0) {
      return;
    }
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
          defaultTime={defaultTime}
          setDefaultTime={setDefaultTime}
          finishedParticipants={finishedParticipants}
          updateCookies={updateCookies}
        />
      </div>
      <main className="main-content">
        <StandupView
          standupStatus={standupStatus}
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
