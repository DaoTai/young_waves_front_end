import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authState$ } from "../../../redux-saga/redux/selectors";

const AuthAdminProtect = ({ children }) => {
   const auth$ = useSelector(authState$);
   const isAdmin = auth$.payload?.user?.isAdmin;
   return <>{isAdmin ? children : <Navigate to="/auth/sign-in" />}</>;
};

export default AuthAdminProtect;
