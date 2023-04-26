import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ChatProvider } from "../../Contexts/Providers";
import { signOut } from "../../redux-saga/redux/actions";
import { authState$ } from "../../redux-saga/redux/selectors";
const AuthProtect = ({ children }) => {
   const auth$ = useSelector(authState$);
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      if (!auth$.payload?.accessToken) {
         dispatch(signOut());
      }
   }, []);
   return (
      <>
         {auth$?.payload?.accessToken ? (
            <>
               <ChatProvider>{children}</ChatProvider>
            </>
         ) : (
            <Navigate to="/auth/sign-in" />
         )}
      </>
   );
};

export default AuthProtect;
