/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ActiveState from "./ActiveState";
import FinishedState from "./FinishedState";
import EmptyState from "./EmptyState";
import { range } from "../../helpers/utils";
import styles from "./StandupView.module.css";
import { motion } from "framer-motion";

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 365); // Add one day

function StandupView({
  standupStatus,
  timer,
  timeValue,
  currentParticipant,
  nextParticipant,
  startStandup,
  restartStandup,
  togglePause,
  participantsLeft,
}) {
  switch (standupStatus) {
    case "idle":
      return <EmptyState onStart={startStandup} />;

    case "running":
    case "pause":
      return (
        <div className={styles.Container}>
          <div className={styles.Stack}>
            {range(participantsLeft).map((index) => {
              return (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                  className={styles.Card}
                  key={index}
                  style={{
                    "--participantsLeft": participantsLeft,
                    "--currentIndex": index,
                  }}
                >
                  {index + 1}
                </motion.div>
              );
            })}
          </div>
          <ActiveState
            standupStatus={standupStatus}
            timer={timer}
            currentParticipant={currentParticipant}
            onNext={nextParticipant}
            onPause={togglePause}
            onRestart={restartStandup}
            timeValue={timeValue}
          />
        </div>
      );
    case "finished":
      return <FinishedState onRestart={restartStandup} />;
    default:
      return null;
  }
}

export default StandupView;
