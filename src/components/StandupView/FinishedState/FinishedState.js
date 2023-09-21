import React from "react";
import styles from "./FinishedState.module.css";
import Button from "../../Button";
import ConfettiExplosion from "react-confetti-explosion";
import PartyPopper from "../../../assets/party_popper.png";

function FinishedState({ onRestart }) {
  return (
    <div className={styles.Container}>
      <div className={styles.PrimaryView}>
        <ConfettiExplosion force={0.8} duration={3000} particleCount={250} />
        <img src={PartyPopper} height="33%" alt="standup_done" />
        <h2>Standup finished!</h2>
      </div>
      <div className={styles.Divider} />
      <div className={styles.Actions}>
        <Button variant="secondary" onClick={onRestart}>
          Restart
        </Button>
      </div>
    </div>
  );
}

export default FinishedState;
