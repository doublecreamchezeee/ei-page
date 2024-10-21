import React from "react";
import dayjs from "dayjs";

import Taskbar from "../Events/Taskbar";
import { useCalendarStore } from "../../store/calendarStore";

import styles from "./CalendarHeader.module.css";

const CalendarHeader = () => {
  const monthIdx = useCalendarStore((state) => state.monthIdx);
  const setMonthIdx = useCalendarStore((state) => state.setMonthIdx);

  const handleMonthChange = (value) => {
    console.log(value);
    if (value === 0) {
      return setMonthIdx(dayjs().month());
    }
    console.log(monthIdx);
    setMonthIdx(monthIdx + value);
  };
  return (
    <header className={styles.header}>
      <div className={styles.calendarSettings}>
        <div className={styles.calendarActions}>
          <button
            className={styles.today}
            onClick={handleMonthChange.bind(null, 0)}
          >
            Today
          </button>
          <div>
            <button
              className={styles.setButtons}
              onClick={handleMonthChange.bind(null, -1)}
            >
              &#60;
            </button>
            <button
              className={styles.setButtons}
              onClick={handleMonthChange.bind(null, 1)}
            >
              &#62;
            </button>
          </div>
        </div>
        <div className={styles.currentMonth}>
          <h2>
            {dayjs(new Date(dayjs().year(), monthIdx)).format("YYYY MMMM")}
          </h2>
        </div>
      </div>
      <Taskbar />
    </header>
  );
};

export default CalendarHeader;
