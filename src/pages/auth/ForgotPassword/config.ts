import * as Yup from "yup";
import { REQUIRED_MSG, LENGTH_PASSWORD } from "../../../utils/constants";

interface ForgotPassword {
   username: string;
   email: string;
}

export const init: ForgotPassword = {
   username: "",
   email: "",
};

export const forgotPasswordSchema = Yup.object().shape({
   username: Yup.string()
      .required(REQUIRED_MSG)
      .min(LENGTH_PASSWORD, `Please enter at least ${LENGTH_PASSWORD} characters`),
   email: Yup.string().email("Email is invalid").required(REQUIRED_MSG).trim(),
});
