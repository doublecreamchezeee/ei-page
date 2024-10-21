import React, { useState } from "react";

import Button from "../shared/components/Form-Elements/Button";
import AuthImage from "../assets/images/loginImage.jpg";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "./Auth.module.css";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={styles.authFormPlacement}>
      <div className={styles.authContent}>
        <div className={styles.authSide}>
          <img className={styles.nomini} src={AuthImage} alt="authForm" />
          <p className={styles.nomini}>One Step Closer</p>
          <p>{isLogin ? "Create a new Account" : "Already have an Account"}</p>
          <Button
            style={{ borderRadius: "2rem" }}
            mid
            warning
            onClick={() => setIsLogin(!isLogin)}
          >
            <p className={styles.white}>{isLogin ? "Register" : "Login"}</p>
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              borderBottom: "1px solid var(--danger)",
              color: "var(--p-dark)",
              display: "block",
            }}
            to="/"
            warning
          >
            Reset Password
          </Button>
        </div>
        <div className={styles.authForm}>
          <h2>{isLogin ? "Login" : "Register"} Form</h2>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
