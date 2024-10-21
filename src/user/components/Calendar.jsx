import React from "react";
import { useState, useEffect } from "react";

import { getMonth } from "../../shared/utils/getCalendarMonth";
import { useCalendarStore } from "../../store/calendarStore";
import CalendarHeader from "../../components/Calendar/CalendarHeader";
import Month from "../../components/Calendar/Month";

import styles from "./Applications.module.css";

const Calendar = () => {
  const monthIdx = useCalendarStore((state) => state.monthIdx);
  const setCurrentDay = useCalendarStore((state) => state.setCurrentDay);
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIdx));
    setCurrentDay();
  }, [monthIdx, setCurrentDay]);

  return (
    <div className={styles.container}>
      <CalendarHeader />
      <div className={styles.calendar}>
        <Month month={currentMonth} />
      </div>
    </div>
  );
};

export default Calendar;
