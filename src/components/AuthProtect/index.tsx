import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signInState$ } from "../../redux-saga/redux/selectors";
import { ChatProvider } from "../../Contexts/Providers";
const AuthProtect = ({ children }) => {
   const user$ = useSelector(signInState$);
   return (
      <>
         {user$.payload?.data && children ? (
            <ChatProvider>{children}</ChatProvider>
         ) : (
            <Navigate to="/auth/sign-in" />
         )}
      </>
   );
};

export default AuthProtect;
