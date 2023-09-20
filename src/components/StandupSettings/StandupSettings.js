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
}) {
  const isIdle = standupStatus === "idle";

  const enableStart = participants.some(
    (participant) => participant.selected && participant.name
  );

  const participantCount = participants.filter(
    (participant) => participant.selected
  ).length;
  const estTime = normalizedTime(participantCount * timeValue);

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        {/* <Logo className={styles.Logo} /> */}
        <h3>Standup</h3>
        <p>{estTime}</p>
      </div>
      <div className={styles.ScrollContainer}>
        {isIdle ? (
          <>
            <TimeSelector
              timeValue={timeValue}
              setTimeValue={setTimeValue}
              updateCookies={updateCookies}
              setTimer={setTimer}
            />
            <ParticipantSelector
              participants={participants}
              setParticipants={setParticipants}
              updateCookies={updateCookies}
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
