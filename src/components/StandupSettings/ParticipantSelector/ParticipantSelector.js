import React from "react";
import styles from "./ParticipantSelector.module.css";
import clsx from "clsx";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";

function ParticipantSelector({
  participants,
  setParticipants,
  onCheckbox,
  onInputChange,
  updateCookies,
}) {
  const removeParticipant = (removedParticipant) => {
    const updatedParticipants = participants.filter(
      (participant) => participant.id !== removedParticipant.id
    );
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);
  };

  return (
    <div className={styles.Container}>
      {participants.length > 0 && (
        <div className={styles.CheckboxGroup}>
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
                    onCheckbox(participant.id);
                  }}
                >
                  <Checkbox.Indicator className={styles.CheckboxIndicator}>
                    <CheckIcon width="28" height="28" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <input
                  type="text"
                  className={styles.Input}
                  defaultValue={participant.name}
                  disabled={!participant.selected}
                  placeholder="Fill in a name"
                  onChange={(event) => {
                    onInputChange({
                      id: participant.id,
                      value: event.target.value,
                    });
                  }}
                  style={{
                    color: participant.selected
                      ? "var(--slate-12)"
                      : "var(--slate-8)",
                  }}
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
        </div>
      )}
    </div>
  );
}

export default ParticipantSelector;
