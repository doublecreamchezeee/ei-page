import React from "react";
import { Route, Redirect } from "react-router-dom";
import { usePersistentStore } from "../../store/authStore";
const AdminRoute = ({ children, ...rest }) => {
  const { authenticated, role } = usePersistentStore((state) => state);

  return (
    <Route
      {...rest}
      render={() =>
        authenticated && role === "admin" ? children : <Redirect to={"/auth"} />
      }
    />
  );
};

export default AdminRoute;
