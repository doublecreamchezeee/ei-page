import React from "react";
import dayjs from "dayjs";

import { useCalendarStore } from "../../store/calendarStore";

import styles from "./Day.module.css";

const Day = ({ day }) => {
  const { selectedDay, setSelectedDay, setOpenModal, setSelectedTask, tasks } =
    useCalendarStore((state) => state);

  const isCurrentDay = () =>
    day.format("ddd - D MMMM - YYYY") === dayjs().format("ddd - D MMMM - YYYY");
  const isCurrentMonth = () => day.format("MM YY") === dayjs().format("MM YY");

  const selected =
    day.format("ddd - D MMMM - YYYY") === selectedDay ? styles.selected : "";

  const notActiveMonth = isCurrentMonth() ? "" : styles.notActiveMonth;
  const activeDay =
    isCurrentDay() && !selectedDay
      ? `${styles.active} ${styles.selected}`
      : isCurrentDay()
      ? styles.active
      : "";

  const dayHandler = () => {
    if (day.isBefore(dayjs(), "day")) {
      return;
    } else if (day.format("ddd - D MMMM - YYYY") === selectedDay) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day.format("ddd - D MMMM - YYYY"));
    }
  };

  return (
    <>
      <div
        onClick={dayHandler}
        className={`${styles.day} ${activeDay} ${notActiveMonth} ${selected}`}
      >
        <header className={styles.dayLayout}>
          <p className={styles.dayNumber}>{day.format("DD")}</p>

          {tasks.map((u, idx) => {
            return day.format("ddd - D MMMM - YYYY") === u.day ? (
              <div
                key={idx}
                style={{ backgroundColor: `${u.labelColor}` }}
                className={styles.task}
                onClick={() => {
                  if (day.isBefore(dayjs(), "day")) {
                    return null;
                  }
                  setSelectedTask(u);
                  setOpenModal(true);
                }}
              >
                <p className={styles.pTag}> {u.title}</p>
              </div>
            ) : (
              ""
            );
          })}
        </header>
      </div>
    </>
  );
};

export default Day;
