import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ChatProvider, VideoCallProvider } from "../../Contexts/Providers";
import { authState$ } from "../../redux-saga/redux/selectors";
const AuthProtect = ({ children }) => {
  const auth$ = useSelector(authState$);
  return (
    <>
      {auth$?.payload?.accessToken ? (
        <VideoCallProvider>
          <ChatProvider>{children}</ChatProvider>
        </VideoCallProvider>
      ) : (
        <Navigate to="/auth/sign-in" />
      )}
    </>
  );
};

export default AuthProtect;
