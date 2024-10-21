import React, { useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useForm } from "../../hooks/form-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../shared/components/UI-Elements/Modal";
import Button from "../../shared/components/Form-Elements/Button";
import Input from "../../shared/components/Form-Elements/Input";
import {
  useApplications,
  useAddApplication,
  useUpdateApplication,
  useRemoveApplication,
} from "../../api/applicationsApi";
import { useUniversities } from "../../api/universitiesApi";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import { VALIDATOR_REQUIRE_SELECT } from "../../shared/utils/validators";
import styles from "./Applications.module.css";

const statusOptions = ["accepted", "declined"].map((item, idx) => (
  <option key={idx} value={item}>
    {item.toUpperCase()}
  </option>
));
const Applications = () => {
  const { formState, inputHandler } = useForm({
    universityId: { value: "", isValid: false },
  });
  const { formState: statusState, inputHandler: statusHandler } = useForm({
    status: { value: "", isValid: false },
  });

  const user = useAuthStore((state) => state.user);

  const [addAppModal, setAddAppModal] = useState(false);
  const [editAppModal, setEditAppModal] = useState(false);
  const [appId, setAppId] = useState(null);

  const stdId = useParams().uid;
  const {
    data: applications,
    isLoading: isAppsLoading,
    isFetching: isAppsFetching,
    isFetched: isAppsFetched,
  } = useApplications(stdId);
  const {
    data: universities,
    isLoading: isUnisLoading,
    isFetching: isUnisFetching,
    isFetched: isUnisFetched,
  } = useUniversities();
  const { mutate: addApplication } = useAddApplication();
  const { mutate: updateApplication } = useUpdateApplication();
  const { mutate: removeApplication } = useRemoveApplication();

  const options = (
    <>
      {universities?.map((uni) => (
        <option key={uni._id} value={uni._id}>
          {uni.name}
        </option>
      ))}
    </>
  );

  const addApplicationHandler = (e) => {
    e.preventDefault();
    setAddAppModal(false);
    const newApplication = {
      universityId: formState.inputs.universityId.value,
      stdId: stdId,
    };
    addApplication(newApplication);
  };
  const editAppHandler = (e) => {
    e.preventDefault();
    setEditAppModal(false);
    const newStatus = {
      status: statusState.inputs.status.value,
      appId: appId,
      stdId: stdId,
    };
    updateApplication(newStatus);
  };

  let content;

  if (isUnisLoading || isUnisFetching || isAppsLoading || isAppsFetching) {
    content = <LoadingSpinner asOverlay />;
  }

  if (isUnisFetched || isAppsFetched) {
    content = (
      <div className={styles.layout}>
        {applications?.length > 0 ? (
          applications?.map((application) => {
            const date = dayjs(application.createdAt).format("DD.MM.YYYY");
            return (
              <div
                key={application._id + 1}
                className={`${styles.applicationDetail} ${
                  application.status === "pending"
                    ? styles.pending
                    : application.status === "declined"
                    ? styles.declined
                    : styles.accepted
                }`}
              >
                <img
                  src={application?.university?.logo.url || ""}
                  alt="school"
                />
                <div className={styles.applicationId}>{application._id}</div>
                <div>{application.status}</div>
                <div className={styles.applicationDate}>{date}</div>
                {user.role === "admin" && (
                  <div className={styles.applicationActions}>
                    <FontAwesomeIcon
                      className={styles.editIcon}
                      onClick={() => {
                        setAppId(application._id);
                        setEditAppModal(true);
                      }}
                      icon={faPen}
                      size="lg"
                    />
                    <FontAwesomeIcon
                      className={styles.deleteIcon}
                      icon={faXmarkCircle}
                      onClick={() => {
                        removeApplication(application._id);
                      }}
                      size="lg"
                    />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h2 style={{ textAlign: "center" }}>No Applications Found</h2>
        )}
        {user.role !== "user" && (
          <Button
            success
            mid
            onClick={() => {
              setAddAppModal(true);
            }}
          >
            Add Application +
          </Button>
        )}
        {addAppModal && (
          <Modal
            onSubmit={addApplicationHandler}
            show={addAppModal}
            header={"Add New Application"}
            headerButton={
              <>
                <div>
                  <p
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => {
                      setAddAppModal(false);
                    }}
                  >
                    <FontAwesomeIcon
                      size="lg"
                      className={styles.deleteIcon}
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
                    setAddAppModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!formState.inputs?.universityId.isValid}
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
            <div className={styles.singleInput}>
              <Input
                id="universityId"
                element="select"
                onInputChange={inputHandler}
                options={options}
                validators={[VALIDATOR_REQUIRE_SELECT()]}
                defaultText="Pick a University"
              />
            </div>
          </Modal>
        )}
        {editAppModal && (
          <Modal
            onSubmit={editAppHandler}
            show={editAppModal}
            header={"Add New Application"}
            headerButton={
              <>
                <div>
                  <p
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => {
                      setEditAppModal(false);
                      setAppId(null);
                    }}
                  >
                    <FontAwesomeIcon
                      size="lg"
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
                    setEditAppModal(false);
                    setAppId(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!statusState.inputs?.status.isValid}
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
            <div className={styles.singleInput}>
              <Input
                id="status"
                element="select"
                onInputChange={statusHandler}
                options={statusOptions}
                validators={[VALIDATOR_REQUIRE_SELECT()]}
                defaultText="Change the Status"
              />
            </div>
          </Modal>
        )}
      </div>
    );
  }

  return content;
};

export default Applications;
