import React, { useEffect } from "react";

import Button from "../../shared/components/Form-Elements/Button";
import Input from "../../shared/components/Form-Elements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { useAddEmployee } from "../../api/usersApi";
import { empInitials } from "../../shared/utils/form initial data/EmployeeInitials";
import { useForm } from "../../hooks/form-hook";
import ImageUpload from "../../shared/components/Form-Elements/FileUpload";

const EmployeeForm = ({ setShowForm }) => {
  const { formState, inputHandler, SetData } = useForm(empInitials);
  const { mutate: addEmployee } = useAddEmployee();

  const addEmpHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("username", formState.inputs.username.value);
    formData.append("email", formState.inputs.email.value);
    formData.append("password", formState.inputs.password.value);
    formData.append("image", formState.inputs.image.value);
    formData.append("role", "employee");

    addEmployee(formData);
    setShowForm(false);
  };
  return (
    <div className="updateForm">
      <form onSubmit={addEmpHandler}>
        <div>
          <div>
            <Input
              id="username"
              type="text"
              label="Username"
              errorText="This field is required"
              onInputChange={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
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
            />
          </div>
          <div>
            <Input
              id="password"
              type="password"
              label="Password"
              errorText="This field is required"
              onInputChange={inputHandler}
              validators={[VALIDATOR_MINLENGTH(6)]}
            />
          </div>
          <div>
            <ImageUpload
              id="image"
              type="file"
              label="Profile Image"
              onInputChange={inputHandler}
              validators={[]}
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
              setShowForm(false);
            }}
          >
            Back
          </Button>
          <Button mid success disabled={!formState.isValid} type="submit">
            Save emp
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
