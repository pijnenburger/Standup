import React from "react";
import styles from "./ActiveParticipant.module.css";
import Button from "../../Button";
import {
  DoubleArrowRightIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
} from "@radix-ui/react-icons";

function ParticipantInfo({ standupStatus, currentParticipant }) {
  return (
    <div className={styles.Participant}>
      {standupStatus === "pause" && (
        <div className={styles.Pause}>
          <PauseIcon color="white" width="44" height="44" />
        </div>
      )}
      <img
        className={styles.Avatar}
        width="64"
        height="64"
        src={`https://ui-avatars.com/api/?name=${currentParticipant.name}&rounded=true`}
        alt={currentParticipant.name}
      />
      <h4>{currentParticipant.name}</h4>
    </div>
  );
}

function TimerDisplay({ timer }) {
  const timerColor = timer < 10 ? "var(--red-11)" : "var(--blue-11)";
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className={styles.Timer}>
      <span>Time remaining</span>
      <span className={styles.TimerCounter} style={{ color: timerColor }}>
        {timer === 0 ? "Time's up!" : formattedTime}
      </span>
    </div>
  );
}

function ActiveParticipant({
  standupStatus,
  currentParticipant,
  timer,
  onPause,
  onNext,
  onRestart,
}) {
  return (
    <div className={styles.Container}>
      <div className={styles.PrimaryView}>
        <ParticipantInfo
          standupStatus={standupStatus}
          currentParticipant={currentParticipant}
        />
        <TimerDisplay timer={timer} />
      </div>
      <div className={styles.Divider} />
      <div className={styles.Actions}>
        <Button variant="secondary" onClick={onRestart}>
          <ResetIcon width="24" height="24" color="red" />
        </Button>
        <Button disabled={timer <= 0} variant="secondary" onClick={onPause}>
          {standupStatus === "running" ? (
            <PauseIcon width="24" height="24" />
          ) : (
            <PlayIcon width="24" height="24" />
          )}
        </Button>
        <Button onClick={onNext}>
          <DoubleArrowRightIcon width="24" height="24" />
        </Button>
      </div>
    </div>
  );
}

export default ActiveParticipant;
