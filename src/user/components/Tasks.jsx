import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  useTasksByUser,
  useUpdateTask,
  useRemoveTask,
  useAddTask,
} from "../../api/tasksApi";
import { useUsersByRole } from "../../api/usersApi";

import { useAuthStore } from "../../store/authStore";

import Modal from "../../shared/components/UI-Elements/Modal";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";

import Input from "../../shared/components/Form-Elements/Input";
import Button from "../../shared/components/Form-Elements/Button";
import { VALIDATOR_REQUIRE_SELECT } from "../../shared/utils/validators";
import { useForm } from "../../hooks/form-hook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./Applications.module.css";

const Tasks = () => {
  const user = useAuthStore((state) => state.user);
  const userId = useParams().uid;

  const [openModal, setOpenModal] = useState(false);
  const [taskData, setTaskData] = useState({});

  const { formState, inputHandler } = useForm({
    stdId: { value: "", isValid: false },
    empId: { value: "", isValid: false },
    title: { value: "", isValid: false },
  });
  const {
    data: employees,
    isLoading: isEmployeesLoading,
    isFetching: isEmployeesFetching,
    isFetched: isEmployeesFetched,
  } = useUsersByRole("employee");
  const {
    data: tasks,
    isLoading: isTasksLoading,
    isFetching: isTasksFetching,
    isFetched: isTasksFetched,
  } = useTasksByUser(userId);
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useRemoveTask();
  const { mutate: addTask } = useAddTask();

  const options = (
    <>
      {employees?.map((emp) => (
        <option key={emp._id} value={emp._id}>
          {emp.username}
        </option>
      ))}
    </>
  );

  const changeHandler = (e) => {
    const value = e.target.checked;
    const key = e.target.id.split("-")[0];
    const id = e.target.id.split("-")[1];

    setTaskData((state) => ({
      ...state,
      [id]: { ...state[id], [key]: value },
    }));
  };

  const formHandler = (e) => {
    e.preventDefault();

    for (let key of Object.keys(taskData)) {
      updateTask({ id: key, ...taskData[key] });
    }
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    const newTask = {
      stdId: formState.inputs.stdId.value,
      empId: formState.inputs.empId.value,
      title: formState.inputs.title.value,
    };

    addTask(newTask);

    setOpenModal(false);
  };

  let content;
  if (
    isEmployeesLoading ||
    isEmployeesFetching ||
    isTasksLoading ||
    isTasksFetching
  ) {
    content = <LoadingSpinner asOverlay />;
  }

  if (isEmployeesFetched && isTasksFetched) {
    content = (
      <div className={styles.layout}>
        {tasks?.length === 0 ? (
          <h2>No Tasks Found</h2>
        ) : (
          <form className={styles.taskForm} onSubmit={formHandler}>
            {tasks?.map((task, idx) => {
              const classes =
                task.completed.byStudent && task.completed.byEmployee
                  ? styles.accepted
                  : !task.completed.byStudent && !task.completed.byEmployee
                  ? styles.declined
                  : styles.pending;
              return (
                <div
                  data-idx={idx}
                  key={task._id}
                  className={`${styles.taskDetail} ${classes}`}
                >
                  {idx === 0 && (
                    <>
                      <div className={styles.taskLabel2}>
                        {task?.users[1].image?.url ? (
                          <img src={task.users[1].image?.url} />
                        ) : (
                          "Std"
                        )}
                      </div>
                      <div className={styles.taskLabel1}>
                        {task?.users[0].image?.url ? (
                          <img src={task.users[0].image?.url} />
                        ) : (
                          "Cslt"
                        )}
                      </div>
                    </>
                  )}
                  <div className={styles.task}>
                    <div style={{ display: "flex", placeItems: "center" }}>
                      {task.title}
                    </div>
                    <div className={styles.taskActions}>
                      <div className={styles.formControl}>
                        <input value={task._id} hidden readOnly />
                        <input
                          id={`stdCheck-${task._id}`}
                          onChange={changeHandler}
                          type="checkbox"
                          defaultChecked={task.completed.byStudent}
                          disabled={
                            task.completed.byStudent || user.role !== "user"
                          }
                        />
                      </div>
                      <div className={styles.formControl}>
                        <input
                          id={`empCheck-${task._id}`}
                          onChange={changeHandler}
                          type="checkbox"
                          defaultChecked={task.completed.byEmployee}
                          disabled={
                            task.completed.byEmployee ||
                            user.role !== "employee"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {user && user.role === "admin" && (
                    <div className={styles.delBtn}>
                      <Button danger onClick={deleteTask.bind(null, task._id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
            <div className={styles.formAction}>
              <Button type="submit" mid>
                Save
              </Button>
            </div>
          </form>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {user.role === "admin" && tasks[0]?.users[0] !== userId && (
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
              mid
              success
            >
              Add Task
            </Button>
          )}
          {openModal && (
            <Modal
              onSubmit={addTaskHandler}
              show={openModal}
              header={"Add New Task"}
              headerButton={
                <>
                  <div>
                    <p
                      style={{ backgroundColor: "transparent" }}
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      <FontAwesomeIcon
                        size="2x"
                        style={{ color: "white", cursor: "pointer" }}
                        icon={faXmarkCircle}
                      />
                    </p>
                  </div>
                </>
              }
              footerStyle={{
                padding: "0",
                border: "none",
                marginBottom: "1rem",
              }}
              footer={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "2rem",
                  }}
                >
                  <Button
                    style={{ margin: "0" }}
                    mid
                    danger
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!formState.isValid}
                    success
                    mid
                    style={{ margin: "0" }}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              }
            >
              <>
                <Input
                  id="title"
                  type="text"
                  placeholder="Title"
                  onInputChange={inputHandler}
                  validators={[]}
                />
                <Input
                  id="empId"
                  element="select"
                  placeholder="Title"
                  onInputChange={inputHandler}
                  options={options}
                  defaultText="Select an Employee"
                  validators={[VALIDATOR_REQUIRE_SELECT()]}
                />
                <Input
                  id="stdId"
                  type="text"
                  placeholder="Student ID"
                  onInputChange={inputHandler}
                  validators={[]}
                  initialValue={userId}
                  initialValid={true}
                />
              </>
            </Modal>
          )}
        </div>
      </div>
    );
  }

  return content;
};

export default Tasks;
