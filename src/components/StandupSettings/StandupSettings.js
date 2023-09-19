import React from "react";
import styles from "./StandupSettings.module.css";

import Button from "../Button";
import ParticipantSelector from "./ParticipantSelector";
import TimeSelector from "./TimeSelector";
import StandupProgress from "./StandupProgress";
import { ReactComponent as Logo } from "../../assets/Logo.svg";

function StandupSettings({
  standupStatus,
  participants,
  setParticipants,
  defaultTime,
  setDefaultTime,
  startStandup,
  updateCookies,
  finishedParticipants,
}) {
  const isIdleOrFinished = ["idle", "finished"].includes(standupStatus);

  const enableStart = participants.some(
    (participant) => participant.selected && participant.name
  );

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Logo className={styles.Logo} />
        <h3>Standup</h3>
      </div>
      <div className={styles.ScrollContainer}>
        {isIdleOrFinished ? (
          <>
            <TimeSelector
              defaultTime={defaultTime}
              setDefaultTime={setDefaultTime}
            />
            <ParticipantSelector
              participants={participants}
              setParticipants={setParticipants}
              updateCookies={updateCookies}
            />
          </>
        ) : (
          <StandupProgress
            participants={participants}
            finishedParticipants={finishedParticipants}
          />
        )}
      </div>
      {isIdleOrFinished && (
        <div className={styles.Footer}>
          <Button disabled={!enableStart} onClick={startStandup}>
            Start
          </Button>
        </div>
      )}
    </div>
  );
}

export default StandupSettings;
