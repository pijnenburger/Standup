import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { useCookies } from "react-cookie";
import { generateParticipant, shuffleArray } from "./helpers/utils";

import StandupView from "./components/StandupView";
import StandupSettings from "./components/StandupSettings";

const initialTime = 120;
const initialParticipants = [
  "Pablo",
  "Franco",
  "Timon",
  "Michiel",
  "Amin",
  "Mikel",
  "Favio",
  "Maria",
  "Oleksandr",
  "Srgjan",
  "Rick",
].map(generateParticipant);

function App() {
  // Cookies
  const [cookies, setCookie] = useCookies([]);
  const savedParticipants = cookies["saved-participants"];
  const defaultParticipants = savedParticipants || initialParticipants;
  const savedTime = cookies["saved-time"];
  const defaultTime = savedTime || initialTime;

  // State related to participants
  const [participants, setParticipants] = useState(defaultParticipants);
  const [standupStatus, setStandupStatus] = useState("idle");
  const [shuffledParticipants, setShuffledParticipants] =
    useState(participants);
  const [currentParticipant, setCurrentParticipant] = useState(null);

  // State related to time settings
  const [timeValue, setTimeValue] = useState(defaultTime);
  const [timer, setTimer] = useState(defaultTime);

  // Defining the selected participants
  const selectedParticipants = participants.filter(
    (participant) => participant.selected && participant.name.trim() !== ""
  );

  // Starting the standup
  const startStandup = () => {
    setStandupStatus("running");
    const shuffledPeople = shuffleArray(selectedParticipants);
    setShuffledParticipants(shuffledPeople);
    setCurrentParticipant(shuffledPeople[0]);
  };

  const updateCookies = (id, value) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365); // Add one day
    setCookie(id, value, {
      expires: expirationDate,
    });
  };

  const resetTimer = () => {
    setTimer(defaultTime);
  };

  function resetParticipants() {
    const updatedParticipants = participants.map((participant) => {
      const { finished, ...rest } = participant; // Create a new object without the "finished" property
      return rest;
    });
    setParticipants(updatedParticipants);
  }

  // Function to restart the standup
  const restartStandup = () => {
    setStandupStatus("idle");
    resetTimer();
    resetParticipants();
  };

  // Function to pause the standup
  const togglePause = () => {
    if (timer > 0) {
      setStandupStatus((prevStatus) =>
        prevStatus === "running" ? "pause" : "running"
      );
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
      const updatedParticipants = participants.map((participant) =>
        participant.id === currentParticipant.id
          ? { ...participant, finished: true }
          : participant
      );
      setParticipants(updatedParticipants);
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

  const participantCount = participants.filter(
    (participant) => participant.selected
  ).length;

  const participantsLeft = participants.filter(
    (participant) => participant.selected && !participant.finished
  ).length;

  return (
    <div className={styles.App}>
      <div className={styles.Sidebar}>
        <StandupSettings
          standupStatus={standupStatus}
          startStandup={startStandup}
          participants={participants}
          setParticipants={setParticipants}
          setTimer={setTimer}
          timeValue={timeValue}
          setTimeValue={setTimeValue}
          updateCookies={updateCookies}
          participantCount={participantCount}
        />
      </div>
      <main className={styles.MainContent}>
        <StandupView
          standupStatus={standupStatus}
          timer={timer}
          timeValue={timeValue}
          startStandup={startStandup}
          currentParticipant={currentParticipant}
          restartStandup={restartStandup}
          togglePause={togglePause}
          nextParticipant={nextParticipant}
          participantsLeft={participantsLeft}
        />
      </main>
    </div>
  );
}

export default App;
