/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./Standup.module.css";
import StandupView from "../StandupView";
import Button from "../Button";

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 365); // Add one day

function Standup({
  standupStatus,
  setStandupStatus,
  timer,
  currentParticipant,
  restartStandup,
  togglePause,
  nextParticipant,
}) {
  switch (standupStatus) {
    case "idle":
      return <div>Empty state screen</div>;

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
