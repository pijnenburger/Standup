import React from "react";
import styles from "./TimeSelector.module.css";

function TimeSelector({ timeValue, setTimeValue, updateCookies, setTimer }) {
  return (
    <div className={styles.InputContainer}>
      <label htmlFor="time_input">Time in seconds</label>
      <input
        id="time_input"
        type="number"
        step={10}
        className={styles.Input}
        defaultValue={timeValue}
        onChange={(event) => {
          const updatedTime = event.target.value;
          setTimeValue(updatedTime);
          setTimer(updatedTime);
          updateCookies("saved-time", updatedTime);
        }}
      />
    </div>
  );
}

export default TimeSelector;
