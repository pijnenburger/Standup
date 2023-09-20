import React, { useState, useEffect } from "react";
import styles from "./ActiveParticipant.module.css";
import Button from "../../Button";
import {
  DoubleArrowRightIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import Avatar from "boring-avatars";
import clsx from "clsx";

function ParticipantInfo({ standupStatus, currentParticipant }) {
  return (
    <div className={styles.Participant}>
      {standupStatus === "pause" && (
        <div className={styles.Pause}>
          <PauseIcon color="white" width="44" height="44" />
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
  const timerColor = timer < 10 ? "var(--red-11)" : "var(--blue-11)";
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

function Actions({ standupStatus, timer, onNext, onRestart, onPause }) {
  return (
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

export default ActiveParticipant;
