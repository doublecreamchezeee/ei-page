import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useAuthStore } from "../../../store/authStore";
import { useLogout } from "../../../api/authApi";

import "./NavLinks.css";

const NavLinks = () => {
  const items = (
    <>
      <li>
        <NavLink to="/cms/employees">Employees</NavLink>
      </li>
      <li>
        <NavLink to="/cms/students">Students</NavLink>
      </li>
      <li>
        {/* <NavLink to="/cms/countries">Countries</NavLink> */}
        <NavLink to="/cms/countries">Du học</NavLink>
      </li>
      <li>
        <NavLink to="/cms/universities">Universities</NavLink>
      </li>
    </>
  );
  return (
    <>
      <ul className="nav-links">
        <li>
          {/* <NavLink to="/countries">Countries</NavLink> */}
          <NavLink to="/countries">Du học</NavLink>
        </li>
        <li>
          <NavLink to="/universities">Việc làm</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Liên hệ</NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavLinks;
