import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/components/Form-Elements/Button";
import Input from "../../shared/components/Form-Elements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { LoginInitials } from "../../shared/utils/form initial data/LoginInitials";
import { useForm } from "../../hooks/form-hook";
import { useLogin } from "../../api/authApi";

const LoginForm = () => {
  const { mutateAsync: logUser } = useLogin();

  const history = useHistory();

  const { formState, inputHandler } = useForm(LoginInitials);
  const loginHandler = async (e) => {
    e.preventDefault();

    const credentials = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };

    let err;
    try {
      await logUser(credentials);
    } catch (error) {
      err = error.message;
    } finally {
      if (!err) history.push("/");
    }
  };
  return (
    <form onSubmit={loginHandler}>
      <div>
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
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button large success disabled={!formState.isValid} type="submit">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
