import React, { useState, useEffect } from "react";
import styles from "./ActiveState.module.css";
import clsx from "clsx";
import Avatar from "boring-avatars";
import IconButton from "../../IconButton/IconButton";
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
          <PauseIcon color="white" width="64" height="64" />
        </div>
      )}
      <Avatar
        size={"100px"}
        name={currentParticipant.name}
        alt={currentParticipant.name}
        variant={"beam"}
        className={styles.Avatar}
      />
      <h1>{currentParticipant.name}</h1>
    </div>
  );
}

function TimerDisplay({ timer }) {
  const timerColor = timer < 10 ? "var(--red-10)" : "var(--blue-11)";
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${String(minutes).padStart(1, "0")}:${String(
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

function StandupPrompts({ currentParticipant }) {
  const prompts = [
    "What did you do yesterday?",
    "What are you planning to do today?",
    "Is anything blocking you?",
  ];
  const [checked, setChecked] = useState(Array(prompts.length).fill(false));

  const toggleCheckbox = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  useEffect(() => {
    setChecked(Array(prompts.length).fill(false));
  }, [currentParticipant, prompts.length]);

  return (
    <div className={styles.Prompts}>
      {prompts.map((prompt, index) => {
        return (
          <button
            onClick={() => toggleCheckbox(index)}
            className={styles.PromptContainer}
            key={`prompt_${index}`}
          >
            <label
              className={
                checked[index]
                  ? clsx(styles.PromptLabel, styles.Checked)
                  : styles.PromptLabel
              }
              htmlFor={`prompt_${index}-${currentParticipant.id}`}
            >
              {prompt}
            </label>
          </button>
        );
      })}
    </div>
  );
}

function Actions({ standupStatus, onNext, onRestart, onPause }) {
  // React.useEffect(() => {
  //   function handleKeyDown(event) {
  //     console.log(event.code);
  //     if (event.code === "KeyN") {
  //       onNext();
  //     }
  //     if (event.code === "KeyP") {
  //       onPause();
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [onNext, onPause]);

  return (
    <div className={styles.Actions}>
      {/* Reset button */}
      <IconButton variant="secondary" onClick={onRestart} label="Reset">
        <ResetIcon width="24" height="24" color="red" />
      </IconButton>
      {/* Pause / play */}
      <IconButton
        variant="secondary"
        onClick={onPause}
        label={standupStatus === "running" ? "Pause" : "Resume"}
      >
        {standupStatus === "running" ? (
          <PauseIcon width="24" height="24" />
        ) : (
          <PlayIcon width="24" height="24" />
        )}
      </IconButton>
      {/* Next */}
      <IconButton variant="primary" onClick={onNext} label="Skip">
        <DoubleArrowRightIcon width="24" height="24" />
      </IconButton>
    </div>
  );
}

function ActiveState({
  standupStatus,
  currentParticipant,
  timer,
  onPause,
  onNext,
  onRestart,
  timeValue,
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
      <div className={styles.SpecialDivider}>
        <div className={styles.Divider} />
        <span>PROMPTS</span>
        <div className={styles.Divider} />
      </div>
      <div className={styles.SecondaryView}>
        <StandupPrompts currentParticipant={currentParticipant} />
      </div>
      <div className={styles.Divider} />
      <Actions
        standupStatus={standupStatus}
        timer={timer}
        onRestart={onRestart}
        onNext={onNext}
        onPause={onPause}
      />
    </div>
  );
}

export default ActiveState;
