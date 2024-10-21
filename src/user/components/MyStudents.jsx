import React from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../shared/components/UI-Elements/Card";
import { useUserById } from "../../api/usersApi";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import styles from "./Applications.module.css";
import { useEffect } from "react";
const MyStudents = ({ setProfile }) => {
  const empId = useParams().uid;
  const {
    data: employee,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
  } = useUserById(empId);

  if (isLoading || isFetching) {
    return <LoadingSpinner asOverlay />;
  }
  if (isFetched && isSuccess)
    return (
      <div className={styles.layout}>
        <div className={styles.stdList}>
          {employee?.assignedStudents?.length > 0 ? (
            employee.assignedStudents?.map((std) => (
              <Link
                to={`/profile/${std._id}`}
                key={std._id}
                onClick={() => {
                  setProfile("");
                }}
              >
                <Card
                  name={std.username}
                  image={
                    std.image ||
                    "https://img.freepik.com/free-photo/studio-portrait-bearded-man-posing-beige-background-looking-into-camera-with-broad-smile-his-face_295783-16582.jpg?w=1380&t=st=1668962600~exp=1668963200~hmac=1d23c2110f4ae876f45c91e50b56163a351f03060a154d846db3639ed676e04c"
                  }
                />
              </Link>
            ))
          ) : (
            <h2 style={{ margin: "auto" }}>No Assigned Students</h2>
          )}
        </div>
      </div>
    );
};

export default MyStudents;
