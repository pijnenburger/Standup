import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Button from "../Button";
import clsx from "clsx";

import styles from "./ParticipantSelector.module.css";

function ParticipantSelector({
  participants,
  setParticipants,
  onCheckbox,
  onInputChange,
  onStart,
}) {
  const addParticipant = () => {
    const newParticipant = {
      id: crypto.randomUUID(),
      name: "",
      selected: true,
    };
    setParticipants([...participants, newParticipant]);
  };

  const removeParticipant = (id) => {
    setParticipants((prevParticipants) =>
      prevParticipants.filter((participant) => participant.id !== id)
    );
  };

  return (
    <div className={styles.Container}>
      <h3 className={styles.Heading}>Select Participants</h3>
      <div className={styles.CheckboxGroup}>
        {participants.map((participant) => (
          <div
            className={
              participant.selected
                ? clsx(styles.ListItem, styles.Active)
                : styles.ListItem
            }
            key={participant.id}
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
            <button className={styles.Delete}>
              <TrashIcon
                width="20"
                height="20"
                onClick={() => {
                  removeParticipant(participant.id);
                }}
              />
            </button>
          </div>
        ))}
      </div>
      <Button variant="secondary" onClick={addParticipant}>
        <PlusIcon
          style={{ position: "absolute", left: "36px" }}
          width="24"
          height="24"
        />
        Add new participant
      </Button>
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
