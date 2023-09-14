import React from "react";
import styles from "./StandupProgress.module.css";

function StandupProgress({ participants, finishedParticipants }) {
  const selectedParticipants = participants.filter(
    (participant) => participant.selected && participant.name !== ""
  );

  return (
    <div className={styles.Container}>
      <h4>Participants left</h4>
      <div className={styles.Divider} />
      <ul>
        {selectedParticipants.map((participant) => (
          <li
            key={participant.id}
            className={
              finishedParticipants.includes(participant)
                ? styles.Finished
                : styles.Upcoming
            }
          >
            {participant.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StandupProgress;
