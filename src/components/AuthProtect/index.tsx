import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authState$ } from "../../redux-saga/redux/selectors";
import { ChatProvider } from "../../Contexts/Providers";
const AuthProtect = ({ children }) => {
   const auth$ = useSelector(authState$);
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
