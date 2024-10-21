import React from "react";
import { Route, Redirect } from "react-router-dom";
import { usePersistentStore } from "../../store/authStore";
const PrivateRoute = ({ children, ...rest }) => {
  const { authenticated } = usePersistentStore((state) => state);

  return (
    <Route
      {...rest}
      render={() => (authenticated ? children : <Redirect to={"/auth"} />)}
    />
  );
};

export default PrivateRoute;
