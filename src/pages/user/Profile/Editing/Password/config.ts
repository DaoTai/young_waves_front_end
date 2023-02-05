import * as Yup from "yup";
import { ChangePassword } from "../../../../../utils/interfaces/Profile";
import { LENGTH_PASSWORD } from "../../../../../utils/constants";

export const textFields = [
   {
      name: "currentPassword",
      type: "password",
      label: "Current password",
      variant: "standard",
      size: "medium",
      placeholder: "Enter your current password",
      required: true,
      fullWidth: true,
   },
   {
      name: "newPassword",
      type: "password",
      label: "New password",
      variant: "standard",
      size: "medium",
      placeholder: "Enter your new password",
      required: true,
      fullWidth: true,
   },
   {
      name: "confirmPassword",
      type: "password",
      label: "Confirm password",
      variant: "standard",
      size: "medium",
      placeholder: "Enter your confirm password",
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
   currentPassword: Yup.string().required().min(LENGTH_PASSWORD),
   newPassword: Yup.string()
      .required()
      .min(LENGTH_PASSWORD)
      .notOneOf([Yup.ref("currentPassword")], "Must be different current password"),
   confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("newPassword")], "Confirmed password is not matched")
      .notOneOf([Yup.ref("currentPassword")], "Must be different current password"),
});
