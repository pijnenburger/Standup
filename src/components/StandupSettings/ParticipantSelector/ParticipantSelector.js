import React, { useRef, useState } from "react";
import styles from "./ParticipantSelector.module.css";
import clsx from "clsx";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { generateParticipant } from "../../../helpers/utils.js";

function ParticipantSelector({ participants, setParticipants, updateCookies }) {
  const [lastInputKey, setLastInputKey] = useState(-1); // Initialize with -1

  const removeParticipant = (removedParticipant) => {
    const updatedParticipants = participants.filter(
      (participant) => participant.id !== removedParticipant.id
    );
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);
  };

  const addParticipant = () => {
    const newParticipant = generateParticipant("");
    const updatedParticipants = [...participants, newParticipant];
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);

    setLastInputKey(newParticipant.id);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Functions to manipulate participants
  const handleCheckbox = (id) => {
    const updatedParticipants = participants.map((participant) =>
      participant.id === id
        ? { ...participant, selected: !participant.selected }
        : participant
    );
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);
  };

  const handleInputChange = ({ id, value }) => {
    const updatedParticipants = participants.map((participant) =>
      participant.id === id ? { ...participant, name: value } : participant
    );
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);
  };

  const handleClearParticipants = () => {
    setParticipants([]);
  };

  const inputRef = useRef(null);

  return (
    <div className={styles.Container}>
      <div className={styles.Heading}>
        <label>Participants</label>
        {participants.length > 0 && (
          <button
            className={styles.ClearButton}
            onClick={handleClearParticipants}
          >
            Clear
          </button>
        )}
      </div>
      <div className={styles.List}>
        {participants.length > 0 && (
          <AnimatePresence mode="sync">
            {participants.map((participant) => (
              <motion.div
                layout
                className={
                  participant.selected
                    ? clsx(styles.ListItem, styles.Active)
                    : styles.ListItem
                }
                key={participant.id}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <Checkbox.Root
                  className={styles.CheckboxRoot}
                  defaultChecked={participant.selected}
                  id={participant.id}
                  onCheckedChange={() => {
                    handleCheckbox(participant.id);
                  }}
                >
                  <Checkbox.Indicator className={styles.CheckboxIndicator}>
                    <CheckIcon width="28" height="28" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <input
                  type="text"
                  className={
                    participant.selected
                      ? clsx(styles.Input, styles.InputSelected)
                      : styles.Input
                  }
                  defaultValue={participant.name}
                  disabled={!participant.selected}
                  placeholder="Fill in a name"
                  onChange={(event) => {
                    handleInputChange({
                      id: participant.id,
                      value: event.target.value,
                    });
                  }}
                  ref={inputRef}
                  autoFocus={lastInputKey === participant.id} // Conditionally focus based on key
                />
                <button
                  className={styles.Delete}
                  onClick={() => {
                    removeParticipant(participant);
                  }}
                >
                  <TrashIcon width="20" height="20" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <button className={styles.PlaceholderButton} onClick={addParticipant}>
          <PlusIcon width={24} height={24} color="currentcolor" />
          Add participant
        </button>
      </div>
    </div>
  );
}

export default ParticipantSelector;
