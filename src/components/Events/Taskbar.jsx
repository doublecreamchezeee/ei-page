import React from "react";
import CreateEvent from "./CreateEvent";
import styles from "./Taskbar.module.css";
const Taskbar = () => {
  return (
    <div className={styles.taskbar}>
      <CreateEvent />
    </div>
  );
};

export default Taskbar;
