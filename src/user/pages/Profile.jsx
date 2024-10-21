import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Applications from "../components/Applications";

import Tasks from "../components/Tasks";
import Calendar from "../components/Calendar";
import Settings from "../components/Settings";
import MyStudents from "../components/MyStudents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faFileArchive,
  faUserCircle,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";

import {
  faGreaterThan,
  faGear,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Profile.module.css";
import { useUserById } from "../../api/usersApi";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import { useAuthStore } from "../../store/authStore";

const Profile = () => {
  const [action, setAction] = useState("");
  const loggedUser = useAuthStore((state) => state.user);
  const uId = useParams().uid;
  const {
    data: user,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
    error,
  } = useUserById(uId);

  let content;

  if (error) {
    if (error.response.status === 401 || error.response.status === 403)
      content = (
        <div className="authError">
          <p>{"Authentication Errror !"}</p>
          <Link to={"/auth"}>Login</Link>
        </div>
      );
  }
  if (isLoading || isFetching) {
    content = <LoadingSpinner asOverlay />;
  }

  if (isFetched && isSuccess) {
    content = (
      <div className={styles.content}>
        <div className={styles.profile}>
          <div className={styles.profileDetails}>
            <div className={styles.profileAvatar}>
              <img
                style={{ borderRadius: "50%" }}
                src={
                  user.image?.url ||
                  "https://cdn-icons-png.flaticon.com/512/758/758802.png?w=826&t=st=1671183488~exp=1671184088~hmac=dc55f6fbbe79eba0ea6862ce712dac55fc43f47e918cd22f638b23933cf2db53"
                }
              />
            </div>
            <div className={styles.profileInfo}>
              <h2>{user.username}</h2>
              <p>{user.role}</p>
            </div>
          </div>
          <div className={styles.profileLinks}>
            {user.role === "employee" && (
              <div
                className={`${styles.link} ${
                  action === "students" ? styles.active : ""
                }`}
                onClick={() => setAction("students")}
              >
                <div className={styles.linkTag}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    size="xl"
                    className={styles.icon}
                  />
                  <p>Students</p>
                </div>
                <span
                  className={styles.arrow}
                  onClick={() => setAction("students")}
                >
                  <FontAwesomeIcon size="lg" icon={faGreaterThan} />
                </span>
              </div>
            )}
            {user.role !== "employee" && (
              <div
                className={`${styles.link} ${
                  action === "applications" ? styles.active : ""
                }`}
                onClick={() => setAction("applications")}
              >
                <div className={styles.linkTag}>
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    size="xl"
                    className={styles.icon}
                  />
                  <p>Applications</p>
                </div>
                <span
                  className={styles.arrow}
                  onClick={() => setAction("applications")}
                >
                  <FontAwesomeIcon size="lg" icon={faGreaterThan} />
                </span>
              </div>
            )}
            <div
              className={`${styles.link} ${
                action === "tasks" ? styles.active : ""
              }`}
              onClick={() => setAction("tasks")}
            >
              <div className={styles.linkTag}>
                <FontAwesomeIcon
                  icon={faFileArchive}
                  className={styles.icon}
                  size="xl"
                />
                <p>Tasks</p>
              </div>
              <span className={styles.arrow} onClick={() => setAction("tasks")}>
                <FontAwesomeIcon size="lg" icon={faGreaterThan} />
              </span>
            </div>
            {(loggedUser._id === uId || loggedUser.role === "admin") && (
              <>
                <div
                  className={`${styles.link} ${
                    action === "calendar" ? styles.active : ""
                  }`}
                  onClick={() => setAction("calendar")}
                >
                  <div className={styles.linkTag}>
                    <FontAwesomeIcon
                      size="xl"
                      icon={faCalendarCheck}
                      className={styles.icon}
                    />
                    <p>Calendar</p>
                  </div>
                  <span
                    className={styles.arrow}
                    onClick={() => setAction("calendar")}
                  >
                    <FontAwesomeIcon size="lg" icon={faGreaterThan} />
                  </span>
                </div>
                <div
                  className={`${styles.link} ${
                    action === "settings" ? styles.active : ""
                  }`}
                  onClick={() => setAction("settings")}
                >
                  <div className={styles.linkTag}>
                    <FontAwesomeIcon
                      size="xl"
                      icon={faGear}
                      className={styles.icon}
                    />
                    <p>Settings</p>
                  </div>
                  <span
                    className={styles.arrow}
                    onClick={() => setAction("settings")}
                  >
                    <FontAwesomeIcon size="lg" icon={faGreaterThan} />
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.application}>
          {!action && <h1>No Actions Taken Yet.</h1>}
          {action === "applications" && <Applications />}
          {action === "tasks" && <Tasks />}
          {action === "calendar" && <Calendar />}
          {action === "settings" && <Settings />}
          {action === "students" && <MyStudents setProfile={setAction} />}
        </div>
      </div>
    );
  }
  return content;
};

export default Profile;
