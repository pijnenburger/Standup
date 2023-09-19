import React from "react";
import styles from "./TimeSelector.module.css";

function TimeSelector({ defaultTime, setDefaultTime }) {
  return (
    <div className={styles.InputContainer}>
      <label htmlFor="time_input">Time in seconds</label>
      <input
        id="time_input"
        type="number"
        step={10}
        className={styles.Input}
        defaultValue={defaultTime}
        onChange={(event) => {
          setDefaultTime(event.target.value);
        }}
      />
    </div>
  );
}

export default TimeSelector;
