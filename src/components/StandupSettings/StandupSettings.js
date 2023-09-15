import React from "react";
import styles from "./StandupSettings.module.css";
import { PlusIcon } from "@radix-ui/react-icons";

import { generateParticipant } from "../../helpers/utils";
import Button from "../Button";
import IconButton from "../IconButton";
import ParticipantSelector from "./ParticipantSelector";
import StandupProgress from "./StandupProgress";

function StandupSettings({
  standupStatus,
  participants,
  setParticipants,
  toggleParticipantSelection,
  handleParticipantChange,
  startStandup,
  updateCookies,
  finishedParticipants,
}) {
  const selectedParticipants = participants.filter(
    (participant) => participant.selected
  );

  // async function fetchRandomUser() {
  //   const response = await fetch("https://randomuser.me/api/?nat=nl&inc=name");
  //   const resJson = await response.json();
  //   const user = resJson.results[0];
  //   const name = user.name.first;
  //   return [name];
  // }

  const addParticipant = () => {
    // const [randomName] = await fetchRandomUser();
    const newParticipant = generateParticipant("");
    const updatedParticipants = [...participants, newParticipant];
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);
  };

  switch (standupStatus) {
    case "idle":
    case "finished":
      return (
        <div className={styles.Container}>
          <div className={styles.Header}>
            <h3>{selectedParticipants.length} Participants</h3>
            <IconButton variant="secondary" onClick={addParticipant}>
              <PlusIcon width="20" height="20" />
            </IconButton>
          </div>
          <div className={styles.ScrollContainer}>
            <ParticipantSelector
              participants={participants}
              setParticipants={setParticipants}
              onCheckbox={toggleParticipantSelection}
              onInputChange={handleParticipantChange}
              updateCookies={updateCookies}
            />
            <button
              className={styles.PlaceholderButton}
              onClick={addParticipant}
            >
              Add participant
            </button>
          </div>
          <div className={styles.Footer}>
            <Button
              disabled={
                !participants.some(
                  (participant) => participant.selected && participant.name
                )
              }
              onClick={startStandup}
            >
              Start
            </Button>
          </div>
        </div>
      );
    case "running":
    case "paused":
      return (
        <div>
          <StandupProgress
            participants={participants}
            finishedParticipants={finishedParticipants}
          />
        </div>
      );
    default:
      return null;
  }
}

export default StandupSettings;
