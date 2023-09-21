import React from "react";
import styles from "./StandupSettings.module.css";

import Button from "../Button";
import ParticipantSelector from "./ParticipantSelector";
import TimeSelector from "./TimeSelector";
import StandupProgress from "./StandupProgress";
import { normalizedTime } from "../../helpers/utils";
// import { ReactComponent as Logo } from "../../assets/Logo.svg";

function StandupSettings({
  standupStatus,
  participants,
  setParticipants,
  timeValue,
  setTimeValue,
  startStandup,
  updateCookies,
  setTimer,
  participantCount,
}) {
  const isIdle = standupStatus === "idle";

  const enableStart = participants.some(
    (participant) => participant.selected && participant.name
  );

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        {/* <Logo className={styles.Logo} /> */}
        <h3>Standup</h3>
      </div>
      <div className={styles.ScrollContainer}>
        {isIdle ? (
          <>
            <TimeSelector
              timeValue={timeValue}
              setTimeValue={setTimeValue}
              updateCookies={updateCookies}
              setTimer={setTimer}
              estTime={normalizedTime(participantCount * timeValue)}
            />
            <ParticipantSelector
              participants={participants}
              setParticipants={setParticipants}
              updateCookies={updateCookies}
              participantCount={participantCount}
            />
          </>
        ) : (
          <StandupProgress participants={participants} />
        )}
      </div>
      {isIdle && (
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
