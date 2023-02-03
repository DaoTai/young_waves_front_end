import * as Yup from "yup";
import { REQUIRED_MSG, LENGTH_PASSWORD } from "../../../utils/constants";
import { SignIn } from "../../../utils/interfaces/Auth";
export const init: SignIn = {
   username: localStorage.getItem("username") || "",
   password: "",
   isRemember: false,
};

export const signInOptions = Yup.object().shape({
   username: Yup.string()
      .required(REQUIRED_MSG)
      .min(LENGTH_PASSWORD, `Please enter at least ${LENGTH_PASSWORD} characters`),
   password: Yup.string()
      .required(REQUIRED_MSG)
      .min(LENGTH_PASSWORD, `Please enter at least ${LENGTH_PASSWORD} characters`),
});
