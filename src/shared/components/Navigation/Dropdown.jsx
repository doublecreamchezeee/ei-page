import React, { useState } from "react";
import styles from "./Dropdown.module.css";
const Dropdown = ({ dropdownItems, show }) => {
  const dropdownStyles = `${styles.dropdown} ${
    show ? styles.show : styles.noshow
  }`;
  return <div className={dropdownStyles}>{dropdownItems}</div>;
};

export default Dropdown;
