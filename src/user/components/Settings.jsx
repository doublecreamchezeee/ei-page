import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

import {
  useUserById,
  useUsersByRole,
  useAssignUsers,
  useDeAssignUser,
  useRemoveUser,
} from "../../api/usersApi";

import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";

import { useForm } from "../../hooks/form-hook";
import Button from "../../shared/components/Form-Elements/Button";
import Input from "../../shared/components/Form-Elements/Input";

import { VALIDATOR_MINLENGTH } from "../../shared/utils/validators";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import styles from "./Applications.module.css";

const Settings = () => {
  const history = useHistory();
  const user = useAuthStore((state) => state.user);
  const userId = useParams().uid;
  const { data: userData, isLoading: isStudentLoading } = useUserById(userId);
  const { data: employees, isLoading, isFetched } = useUsersByRole("employee");
  const { mutate: assignUsers } = useAssignUsers();
  const { mutate: deAssignUsers } = useDeAssignUser();
  const { mutate: deleteUser } = useRemoveUser();

  const [consults, setConsults] = useState(userData?.assignedConsultants);

  const { formState: consultFormState, arrayInputHandler } = useForm({
    consultId: {
      value: [],
      isValid: false,
    },
  });
  const { formState, inputHandler } = useForm({
    oldPassword: {
      value: "",
      isValid: false,
    },
    password1: {
      value: "",
      isValid: false,
    },
    password2: {
      value: "",
      isValid: false,
    },
  });

  const options = (
    <>
      {employees.map((emp) => (
        <option key={emp._id} value={emp._id}>
          {emp.username}
        </option>
      ))}
    </>
  );

  const match =
    formState.inputs.password1.value === formState.inputs.password2.value;

  const addConsultHandler = () => {
    setConsults(consultFormState.inputs.consultId.value);
  };
  const saveConsultHandler = (e) => {
    e.preventDefault();

    const consultIds = consultFormState.inputs.consultId.value;
    const sentData = { stdId: userId, consultIds: consultIds };

    assignUsers(sentData);
  };
  const passChangeHandler = (e) => {
    e.preventDefault();
    if (formState.inputs.password1.value !== formState.inputs.password2.value) {
      return;
    }
    const passChange = {
      oldPassword: formState.inputs.oldPassword.value,
      newPassword: formState.inputs.password1.value,
    };

    console.log(passChange);
  };

  let content;
  if (isLoading || isStudentLoading) {
    content = <LoadingSpinner asOverlay />;
  }

  if (isFetched) {
    content = (
      // admin or the url userId is equal to the logged in user.
      <div className={styles.layout}>
        <div className={styles.settings}>
          {user.role === "admin" && userData.role !== "employee" && (
            <div>
              <h4>Assign Consultant</h4>
              <ul>
                {consults?.map((cons, idx) => (
                  <li key={cons._id || idx} style={{ marginBottom: "0.5rem" }}>
                    {cons.username || cons}
                    <FontAwesomeIcon
                      style={{
                        marginLeft: "0.5rem",
                        cursor: "pointer",
                        color: "var(--danger)",
                      }}
                      size="lg"
                      icon={faCircleXmark}
                      onClick={() => {
                        deAssignUsers({ stdId: userId, consultId: cons._id });
                        setConsults((prev) =>
                          prev.filter((cons, i) => i !== idx)
                        );
                      }}
                    />
                  </li>
                ))}
              </ul>
              <form onSubmit={saveConsultHandler}>
                <Input
                  id="consultId"
                  element="select"
                  onInputChange={arrayInputHandler}
                  options={options}
                  validators={[]}
                  defaultText="Assign Consultant"
                />
                <Button
                  disabled={consultFormState.inputs.consultId.value.length < 1}
                  type="submit"
                >
                  Save
                </Button>
                <Button onClick={addConsultHandler}>Add +</Button>
              </form>
            </div>
          )}
          {/* userid === uid */}
          <div>
            <h4>Update Password</h4>
            <form onSubmit={passChangeHandler}>
              <Input
                id="oldPassword"
                type="password"
                placeholder="Old Password"
                onInputChange={inputHandler}
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Min Length must be 6"
                initialValid
              />
              <Input
                id="password1"
                type="password"
                placeholder="New Password"
                onInputChange={inputHandler}
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Min Length must be 6"
                initialValid
              />
              <Input
                id="password2"
                type="password"
                placeholder="Repeat Password"
                onInputChange={inputHandler}
                errorText="Min Length must be 6"
                validators={[VALIDATOR_MINLENGTH(6)]}
              />
              {!match && <p style={{ color: "red" }}>Password doesnt match</p>}
              <Button disabled={!formState.isValid || !match} type="submit">
                Change
              </Button>
            </form>
          </div>

          <div>
            <h4>Delete Account</h4>
            <Button
              onClick={() => {
                history.replace(`/cms/${userData.role}s`);
                deleteUser({ id: userId, role: userData.role });
              }}
              danger
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default Settings;
