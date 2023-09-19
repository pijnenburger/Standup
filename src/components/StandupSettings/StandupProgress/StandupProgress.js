import React from "react";
import styles from "./StandupProgress.module.css";
import clsx from "clsx";

function StandupProgress({ participants, finishedParticipants }) {
  const selectedParticipants = participants.filter(
    (participant) => participant.selected && participant.name !== ""
  );

  return (
    <div className={styles.Container}>
      <h4>Participants left</h4>
      <div className={styles.List}>
        {selectedParticipants.map((participant) => (
          <div
            key={participant.id}
            className={
              finishedParticipants.includes(participant)
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
