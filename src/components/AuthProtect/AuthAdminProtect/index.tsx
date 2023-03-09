import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authState$ } from "../../../redux-saga/redux/selectors";

const AuthAdminProtect = ({ children }) => {
   const {
      payload: { data },
   } = useSelector(authState$);
   const isAdmin = data?.user?.isAdmin;
   return <>{isAdmin ? children : <Navigate to="/auth/sign-in" />}</>;
};

export default AuthAdminProtect;
