import * as Yup from "yup";
import { init as initSignUp } from "../../../auth/SignUp/config";
import { Profile } from "../../../../utils/interfaces/Profile";
import { REQUIRED_MSG } from "../../../../utils/constants";

export const init: Partial<Profile> = {
   ...initSignUp,
   _id: "",
};

export const updateUserOptions = Yup.object().shape({
   fullName: Yup.string()
      .required(REQUIRED_MSG)
      .trim()
      .matches(/^([^0-9]*)$/, "Name is invalid"),
   dob: Yup.string().required(REQUIRED_MSG),
   address: Yup.string().required(REQUIRED_MSG).trim(),
   region: Yup.string()
      .required(REQUIRED_MSG)
      .matches(/^([^0-9]*)$/, "Region is invalid"),
   gender: Yup.string().required(REQUIRED_MSG),
   email: Yup.string().email("Email is invalid").required(REQUIRED_MSG).trim(),
});
