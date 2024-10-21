import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../shared/components/Form-Elements/Button";
import Input from "../../shared/components/Form-Elements/Input";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import ImageUpload from "../../shared/components/Form-Elements/FileUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { useForm } from "../../hooks/form-hook";
import { useUserById, useUpdateEmployee } from "../../api/usersApi";
import { empInitials } from "../../shared/utils/form initial data/EmployeeInitials";

const EmployeeUpdateForm = () => {
  const { formState, inputHandler } = useForm();

  const history = useHistory();
  const empId = useParams().eid;

  const {
    data: empl,
    isLoading,
    isFetched,
    isFetching,
    isSuccess,
  } = useUserById(empId);
  const { mutate: updateEmployee } = useUpdateEmployee();

  const updateEmpHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", empl._id);
    formData.append("username", formState.inputs.username.value);
    formData.append("email", formState.inputs.email.value);
    formData.append("password", formState.inputs.password.value);
    formData.append("active", empl.active);

    if (formState.inputs.image?.value) {
      formData.append("image", formState.inputs.image.value);
    }

    updateEmployee(formData);
    history.goBack();
  };

  let content;

  if (isLoading || isFetching) {
    content = <LoadingSpinner asOverlay />;
  }

  if (isFetched && isSuccess) {
    content = (
      <div className="updateForm">
        <h2>Update {empl.username}</h2>
        <form onSubmit={updateEmpHandler}>
          <div>
            <div>
              <Input
                id="username"
                type="text"
                label="Username"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                initialValue={empl?.username}
                initialValid={true}
              />
            </div>
            <div>
              <Input
                id="email"
                type="email"
                label="Email"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_EMAIL()]}
                initialValue={empl?.email}
                initialValid={true}
              />
            </div>
            <div>
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="**********"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_MINLENGTH(6)]}
                initialValid={true}
              />
            </div>
            <div>
              <ImageUpload
                id="image"
                type="file"
                label="Profile Image"
                errorText="Supported extensions are : .jpg, .png, .jpeg"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                initialValid={true}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Button
              mid
              warning
              onClick={() => {
                history.goBack();
              }}
            >
              Back
            </Button>
            <Button mid success disabled={!formState.isValid} type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    );
  }
  return content;
};

export default EmployeeUpdateForm;
