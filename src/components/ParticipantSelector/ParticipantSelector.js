import React from "react";
import styles from "./ParticipantSelector.module.css";
import clsx from "clsx";
import { generateParticipant } from "../../helpers/utils";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";

function ParticipantSelector({
  participants,
  setParticipants,
  onCheckbox,
  onInputChange,
  onStart,
  updateCookies,
}) {
  async function fetchRandomUser() {
    const response = await fetch(
      "https://randomuser.me/api/?nat=nl&inc=name,picture"
    );
    const resJson = await response.json();
    const user = resJson.results[0];
    const name = user.name.first;
    const avatar = user.picture.medium;

    return [name, avatar];
  }

  const addParticipant = async () => {
    // eslint-disable-next-line no-unused-vars
    const [randomName, randomAvatar] = await fetchRandomUser();
    const newParticipant = generateParticipant(randomName);
    const updatedParticipants = [...participants, newParticipant];
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);
  };

  const removeParticipant = (removedParticipant) => {
    const updatedParticipants = participants.filter(
      (participant) => participant.id !== removedParticipant.id
    );
    setParticipants(updatedParticipants);
    updateCookies(updatedParticipants);
  };

  const selectedParticipants = participants.filter(
    (participant) => participant.selected
  );

  return (
    <div className={styles.Container}>
      <div className={styles.ContainerHeading}>
        <h3 className={styles.Heading}>Select Participants</h3>
        <span>{selectedParticipants.length}</span>
      </div>
      <div className={styles.Divider} />
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
                {/* <img
                src={participant.avatar}
                className={styles.Avatar}
                alt={participant.name}
              /> */}
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
      <Button variant="secondary" onClick={addParticipant}>
        <PlusIcon
          style={{ position: "absolute", left: "36px" }}
          width="24"
          height="24"
        />
        Add new participant
      </Button>
      <div className={styles.Divider} />
      <Button
        disabled={!participants.some((participant) => participant.selected)}
        onClick={onStart}
      >
        Start
      </Button>
    </div>
  );
}

export default ParticipantSelector;
