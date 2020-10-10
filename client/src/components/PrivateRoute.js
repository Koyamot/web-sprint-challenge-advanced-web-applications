import React from "react";
import { Route, Redirect } from "react-router-dom";

/*
  1. API is the same as <Route />
  2. it renders <Route /> and passes all the props to it
  3. it checks if the user is not authenticated it redirects to /login
  4. if the user is authenticated,   it renders the Component passed in through props
  */

const isUserAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={() => {
        /* */
        if (isUserAuthenticated()) {
          return <Component />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
