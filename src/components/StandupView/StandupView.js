import React from "react";
import styles from "./StandupView.module.css";
import Button from "../Button";
import {
  DoubleArrowRightIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
} from "@radix-ui/react-icons";

function StandupView({
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
        <div className={styles.Timer}>
          <span>Time remaining</span>
          <span
            className={styles.TimerCounter}
            style={{
              color: timer < 10 ? "red" : "var(--blue-11)",
            }}
          >
            {timer === 0 ? "Time's up" : timer}
          </span>
        </div>
      </div>
      <div className={styles.Divider} />
      <div className={styles.Actions}>
        <Button variant="secondary" onClick={onRestart}>
          <ResetIcon width="24" height="24" color="red" />
        </Button>
        <Button variant="secondary" onClick={onPause}>
          {standupStatus === "running" ? (
            <PauseIcon width="24" height="24" />
          ) : (
            <PlayIcon width="24" height="24" />
          )}{" "}
        </Button>
        <Button onClick={onNext}>
          <DoubleArrowRightIcon width="24" height="24" />
        </Button>
      </div>
    </div>
  );
}

export default StandupView;
