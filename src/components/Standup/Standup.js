/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import styles from "./Standup.module.css";

import ParticipantSelector from "../ParticipantSelector";
import StandupProgress from "../StandupProgress";
import StandupView from "../StandupView";
import Button from "../Button";

import { shuffleArray } from "../../helpers/utils";

function Standup({ initialParticipants, initialTime }) {
  const [timer, setTimer] = useState(initialTime);
  const [standupStatus, setStandupStatus] = useState("idle");
  const [participants, setParticipants] = useState(initialParticipants);
  const [shuffledParticipants, setShuffledParticipants] =
    useState(initialParticipants);
  const [currentParticipant, setCurrentParticipant] = useState(null);
  const [finishedParticipants, setFinishedParticipants] = useState([]);

  // Function to start the standup
  const startStandup = () => {
    const selectedParticipants = participants.filter(
      (participant) => participant.selected && participant.name !== ""
    );
    if (selectedParticipants.length === 0) {
      return; // No selected participants, do nothing
    }

    setFinishedParticipants([]);
    setTimer(initialTime); // Set the initial timer value
    setStandupStatus("running");
    const shuffledPeople = shuffleArray(selectedParticipants);
    setShuffledParticipants(shuffledPeople);
    setCurrentParticipant(shuffledPeople[0]);
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
      setTimer(initialTime);
    }
  };

  // Function to toggle participant selection
  const toggleParticipantSelection = (id) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.id === id
          ? { ...participant, selected: !participant.selected }
          : participant
      )
    );
  };

  // Function to toggle participant selection
  const handleParticipantChange = ({ id, value }) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.id === id ? { ...participant, name: value } : participant
      )
    );
  };

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

  // Add current participant to finished participants
  useEffect(() => {
    if (currentParticipant) {
      setFinishedParticipants((prevFinishedParticipants) => [
        ...prevFinishedParticipants,
        currentParticipant,
      ]);
    }
  }, [currentParticipant]);

  // Handle when timer hits 0
  useEffect(() => {
    if (timer === 0) {
      setStandupStatus("pause");
    }
  }, [timer]);

  switch (standupStatus) {
    case "idle":
      return (
        <ParticipantSelector
          participants={participants}
          setParticipants={setParticipants}
          onCheckbox={toggleParticipantSelection}
          onInputChange={handleParticipantChange}
          onStart={startStandup}
        />
      );

    case "running":
    case "pause":
      return (
        <>
          <StandupView
            standupStatus={standupStatus}
            timer={timer}
            currentParticipant={currentParticipant}
            onNext={nextParticipant}
            onPause={togglePause}
            onRestart={restartStandup}
          />
          <StandupProgress
            participants={participants}
            finishedParticipants={finishedParticipants}
          />
        </>
      );
    case "finished":
      return (
        <>
          <div className={styles.Container}>
            <h2>Finished</h2>
            <Button
              variant="secondary"
              onClick={() => {
                setStandupStatus("idle");
              }}
            >
              Restart
            </Button>
          </div>
        </>
      );
    default:
      return null;
  }
}

export default Standup;
