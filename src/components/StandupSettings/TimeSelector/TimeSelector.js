import React from "react";
import styles from "./TimeSelector.module.css";

function TimeSelector({
  timeValue,
  setTimeValue,
  updateCookies,
  setTimer,
  estTime,
}) {
  return (
    <div className={styles.InputContainer}>
      <div className={styles.Heading}>
        <label htmlFor="time_select">Time per person</label>
        <span className={styles.HeadingData}>{estTime} total</span>
      </div>
      <select
        className={styles.Input}
        style={{
          appearance: "none",
        }}
        id="time_select"
        defaultValue={timeValue}
        onChange={(event) => {
          const updatedTime = event.target.value;
          setTimeValue(updatedTime);
          setTimer(updatedTime);
          updateCookies("saved-time", updatedTime);
        }}
      >
        <option value="30" label="0:30" />
        <option value="60" label="1:00" defaultChecked />
        <option value="90" label="1:30" />
        <option value="120" label="2:00" />
        <option value="180" label="3:00" />
        <option value="300" label="5:00" />
      </select>
      {/* <input
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
      /> */}
    </div>
  );
}

export default TimeSelector;
