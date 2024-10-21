import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useUsersByRole, useRemoveUser } from "../../api/usersApi";
import { useSearchStore } from "../../store/searchStore";
import Button from "../../shared/components/Form-Elements/Button";
import Card from "../../shared/components/UI-Elements/Card";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import SearchBar from "../../shared/components/UI-Elements/SearchBar";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import styles from "./UserList.module.css";
const EmployeesList = () => {
  const search = useSearchStore((state) => state.search);

  const [showForm, setShowForm] = useState(false);
  const {
    data: emps,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
    error,
  } = useUsersByRole("employee");
  const { mutate: removeEmployee, isLoading: isMutating } = useRemoveUser();

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
  if (isLoading || isFetching || isMutating) {
    content = <LoadingSpinner asOverlay />;
  }
  if (isFetched && isSuccess) {
    content = (
      <div className={styles.listPage}>
        {showForm && (
          <div
            style={{ width: "100%", display: "flex", placeContent: "center" }}
          >
            <EmployeeForm setShowForm={setShowForm} />
          </div>
        )}
        {!showForm && (
          <>
            <div className={styles.searchBar}>
              <SearchBar />
            </div>
            <div className={styles.addEmp}>
              <Button
                onClick={() => {
                  setShowForm(true);
                }}
                mid
                success
              >
                Add Employee
              </Button>
            </div>

            <div className={styles.list}>
              {emps
                .filter((e) =>
                  e.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((emp) => (
                  <Card
                    name={emp.username}
                    key={emp._id + 1}
                    image={
                      emp.image?.url ||
                      "https://cdn-icons-png.flaticon.com/512/758/758802.png?w=826&t=st=1671183488~exp=1671184088~hmac=dc55f6fbbe79eba0ea6862ce712dac55fc43f47e918cd22f638b23933cf2db53"
                    }
                    actions={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Button
                          onClick={() => {
                            removeEmployee({ id: emp._id, role: emp.role });
                          }}
                          danger
                        >
                          Del
                        </Button>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Button
                            style={{ backgroundColor: "var(--white)" }}
                            to={`/profile/${emp._id}`}
                          >
                            Profile
                          </Button>
                          <Button
                            style={{ backgroundColor: "var(--white)" }}
                            to={`/cms/employees/${emp._id}`}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    }
                  />
                ))}
            </div>
          </>
        )}
      </div>
    );
  }
  return content;
};

export default EmployeesList;
