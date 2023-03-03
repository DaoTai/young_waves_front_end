import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signInState$ } from "../../../redux-saga/redux/selectors";

const AuthAdminProtect = ({ children }) => {
   const {
      payload: { data },
   } = useSelector(signInState$);
   const isAdmin = data?.payload?.isAdmin;
   return <>{isAdmin ? children : <Navigate to="/auth/sign-in" />}</>;
};

export default AuthAdminProtect;
