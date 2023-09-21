import React from "react";
import styles from "./StandupProgress.module.css";
import clsx from "clsx";

function StandupProgress({ participants }) {
  const selectedParticipants = participants.filter(
    (participant) => participant.selected && participant.name !== ""
  );

  const participantsLeftCount = selectedParticipants.filter(
    (participant) => !participant.finished
  ).length;

  return (
    <div className={styles.Container}>
      <label className={styles.Heading}>
        <span>Participants left</span>
        <span className={styles.HeadingData}>{participantsLeftCount}</span>
      </label>
      <div className={styles.List}>
        {selectedParticipants.map((participant) => (
          <div
            key={participant.id}
            className={
              participant.finished
                ? clsx(styles.ListItem, styles.Finished)
                : styles.ListItem
            }
          >
            {participant.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StandupProgress;
