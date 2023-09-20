/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./StandupView.module.css";
import ActiveParticipant from "./ActiveParticipant";
import FinishedView from "./FinishedView";
import { ReactComponent as EmptyState } from "../../assets/empty_state.svg";

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 365); // Add one day

function StandupView({
  standupStatus,
  timer,
  currentParticipant,
  restartStandup,
  togglePause,
  nextParticipant,
}) {
  switch (standupStatus) {
    case "idle":
      return (
        <div className={styles.EmptyStateContainer}>
          <EmptyState className={styles.Illustration} />
          <div className={styles.Content}>
            <h3>Your standup companion app</h3>
            <p>Keep track of your randomized standup!</p>
          </div>
        </div>
      );

    case "running":
    case "pause":
      return (
        <ActiveParticipant
          standupStatus={standupStatus}
          timer={timer}
          currentParticipant={currentParticipant}
          onNext={nextParticipant}
          onPause={togglePause}
          onRestart={restartStandup}
        />
      );
    case "finished":
      return <FinishedView onRestart={restartStandup} />;
    default:
      return null;
  }
}

export default StandupView;
