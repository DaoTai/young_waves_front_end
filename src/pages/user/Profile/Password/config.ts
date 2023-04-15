import * as Yup from "yup";
import { ChangePassword } from "../../../../utils/interfaces/Profile";
import { LENGTH_PASSWORD, REQUIRED_MSG } from "../../../../utils/constants";

export const textFields = [
   {
      name: "currentPassword",
      type: "password",
      label: "Current password",
      variant: "standard",
      size: "medium",
      placeholder: "Enter current password",
      required: true,
      fullWidth: true,
   },
   {
      name: "newPassword",
      type: "password",
      label: "New password",
      variant: "standard",
      size: "medium",
      placeholder: "Enter new password",
      required: true,
      fullWidth: true,
   },
   {
      name: "confirmPassword",
      type: "password",
      label: "Confirm password",
      variant: "standard",
      size: "medium",
      placeholder: "Enter confirm password",
      required: true,
      fullWidth: true,
   },
];

export const init: ChangePassword = {
   currentPassword: "",
   newPassword: "",
   confirmPassword: "",
};

export const changePasswordPassword = Yup.object().shape({
   currentPassword: Yup.string().required(REQUIRED_MSG).min(LENGTH_PASSWORD),
   newPassword: Yup.string()
      .required(REQUIRED_MSG)
      .min(LENGTH_PASSWORD)
      .notOneOf([Yup.ref("currentPassword")], "Must be different current password"),
   confirmPassword: Yup.string()
      .required(REQUIRED_MSG)
      .oneOf([Yup.ref("newPassword")], "Confirmed password is not matched")
      .notOneOf([Yup.ref("currentPassword")], "Must be different current password"),
});
