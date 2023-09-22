import React from "react";
import styles from "./EmptyState.module.css";
import Button from "../../Button";
import { ReactComponent as Illustration } from "../../../assets/Logo.svg";

function EmptyState({ onStart }) {
  return (
    <div className={styles.Container}>
      <Illustration className={styles.Illustration} />
      <div className={styles.Content}>
        <h3>Your standup companion app</h3>
        <p>Keep track of your randomized standup!</p>
      </div>
      <Button style={{ width: "auto" }} onClick={onStart}>
        Start standup
      </Button>
    </div>
  );
}

export default EmptyState;
