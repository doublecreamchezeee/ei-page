import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import Modal from "../../shared/components/UI-Elements/Modal";
import { useCalendarStore } from "../../store/calendarStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faTrashCan,
  faCalendarPlus,
  faCalendarDays,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";

import styles from "./CreateEvent.module.css";

const CreateEvent = () => {
  const {
    currentDay,
    selectedDay,
    openModal,
    setOpenModal,
    selectedTask,
    setSelectedTask,
    addTask,
    updateTask,
    deleteTask,
  } = useCalendarStore((state) => state);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labelSelected, setLabelSelected] = useState(
    selectedTask ? selectedTask.labelColor : "#FF006E"
  );

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setLabelSelected(selectedTask.labelColor);
    }
  }, [selectedTask]);

  const showDate = `${
    selectedDay
      ? selectedDay
      : selectedTask
      ? selectedTask.day
      : dayjs(new Date(currentDay)).format("ddd - D MMMM  - YYYY")
  }`;
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const taskOBJ = {
      title: title,
      description: description,
      day: selectedTask
        ? selectedTask.day
        : selectedDay
        ? selectedDay
        : dayjs(currentDay).format("ddd - D MMMM - YYYY"),
      labelColor: labelSelected,
      id: selectedTask ? selectedTask.id : Date.now(), // some unique id
    };

    if (selectedTask) updateTask(taskOBJ);
    else addTask(taskOBJ);

    setTitle("");
    setDescription("");
    setLabelSelected("#FF006E");
    setSelectedTask(null);
    setOpenModal(false);
  };

  const deleteHandler = (id) => {
    deleteTask(id);

    setTitle("");
    setDescription("");
    setLabelSelected("#FF006E");
    setSelectedTask(null);
    setOpenModal(false);
  };
  const labelColors = [
    "#FF006E",
    "#FB5607",
    "#3A86FF",
    "#8338EC",
    "#E70E02",
    "#1F1300",
  ];

  return (
    <React.Fragment>
      <button
        className={styles.button}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <span>Add Event</span>
        <FontAwesomeIcon
          size={"2x"}
          color="var(--success-hover)"
          icon={faCalendarPlus}
        />
      </button>
      {openModal && (
        <Modal
          onSubmit={handleFormSubmit}
          onClick={() => {
            setSelectedTask(null);
            setTitle("");
            setDescription("");
            setLabelSelected("#FF006E");
            setOpenModal(false);
          }}
          show={openModal}
          header={selectedTask ? "Update Task" : "Add New Task"}
          headerButton={
            <>
              <div>
                <button
                  onClick={() => {
                    if (!selectedTask) return;
                    deleteHandler(selectedTask.id);
                  }}
                  className={styles.deleteBtn}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    setSelectedTask(null);
                    setTitle("");
                    setDescription("");
                    setLabelSelected("#FF006E");
                    setOpenModal(false);
                  }}
                >
                  <FontAwesomeIcon icon={faXmarkCircle} />
                </button>
              </div>
            </>
          }
          footer={
            <div className={styles.modalButton}>
              <button
                onClick={() => {
                  setSelectedTask(null);
                  setTitle("");
                  setDescription("");
                  setLabelSelected("#FF006E");
                  setOpenModal(false);
                }}
              >
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          }
        >
          <div className={styles.formContent}>
            <div className={styles.formInput}>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Task Header"
              />
            </div>
            <div className={styles.formInput}>
              <textarea
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Task Description"
                rows={4}
              />
            </div>
            <div className={styles.details}>
              <FontAwesomeIcon
                size={"2x"}
                color="var(--warning-hover)"
                icon={faCalendarDays}
              />
              <p>{showDate}</p>
            </div>
            <div className={styles.details}>
              <FontAwesomeIcon
                size={"2x"}
                color="var(--regular-hover)"
                icon={faBookmark}
              />
              {labelColors.map((color, idx) => {
                const colorSelected =
                  labelSelected === color
                    ? `${styles.color} ${styles.active}`
                    : `${styles.color}`;
                return (
                  <span
                    key={idx}
                    style={{ backgroundColor: `${color}` }}
                    className={colorSelected}
                    onClick={() => setLabelSelected(color)}
                  ></span>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default CreateEvent;
