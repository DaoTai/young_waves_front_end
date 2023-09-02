import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ChatProvider } from "../../Contexts/Providers";
import { authState$ } from "../../redux-saga/redux/selectors";
const AuthProtect = ({ children }) => {
  const auth$ = useSelector(authState$);
  return (
    <>
      {auth$?.payload?.accessToken ? (
        <ChatProvider>{children}</ChatProvider>
      ) : (
        <Navigate to="/auth/sign-in" />
      )}
    </>
  );
};

export default AuthProtect;
