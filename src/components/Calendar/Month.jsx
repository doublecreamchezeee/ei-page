import React from "react";
import Day from "./Day";

import styles from "./Month.module.css";

const Month = ({ month }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className={styles.monthLayout}>
      {days.map((day, idx) => (
        <div key={idx} className={styles.dayNames}>
          <h5>{day}</h5>
        </div>
      ))}

      {month.map((row, idx) => {
        return (
          <React.Fragment key={idx}>
            {row.map((day, i) => {
              return <Day day={day} key={i} />;
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Month;
