import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signInState$ } from "../../redux-saga/redux/selectors";
const AuthProtect = (props) => {
   const user$ = useSelector(signInState$);
   return <>{user$.payload?.data ? props.children : <Navigate to="/auth/sign-in" />}</>;
};

export default AuthProtect;
