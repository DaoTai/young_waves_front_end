import * as Yup from "yup";
import { TextField, RadioField, SignUp } from "../../../utils/interfaces/Auth";
import { REQUIRED_MSG, LENGTH_PASSWORD, LENGTH_USERNAME } from "../../../utils/constants";
export const textInfoUser: Array<TextField> = [
   {
      name: "fullName",
      type: "text",
      label: "Full name",
      variant: "outlined",
      margin: "normal",
      size: "medium",
      placeholder: "Enter your name",
      required: true,
      fullWidth: true,
      autoComplete: "off",
   },
   {
      name: "city",
      type: "text",
      label: "City",
      variant: "outlined",
      margin: "normal",
      size: "medium",
      placeholder: "Enter your city",
      required: true,
      fullWidth: true,
      autoComplete: "off",
   },
   {
      name: "email",
      type: "email",
      label: "Email",
      variant: "outlined",
      margin: "normal",
      size: "medium",
      placeholder: "Enter your email",
      required: true,
      fullWidth: true,
      autoComplete: "off",
   },
];

export const textFields: Array<TextField> = [
   ...textInfoUser,
   {
      name: "username",
      type: "text",
      label: "User name",
      variant: "outlined",
      margin: "normal",
      size: "medium",
      placeholder: "Enter your username",
      required: true,
      fullWidth: true,
   },
   {
      name: "password",
      type: "password",
      label: "Password",
      variant: "outlined",
      margin: "normal",
      size: "medium",
      placeholder: "Enter your password",
      required: true,
      fullWidth: true,
   },
   {
      name: "confirmedPassword",
      type: "password",
      label: "Confirm password",
      variant: "outlined",
      margin: "normal",
      size: "medium",
      placeholder: "Confirm your password",
      required: true,
      fullWidth: true,
   },
];

export const radioFields: Array<RadioField> = [
   {
      label: "Gender",
      name: "gender",
      radioes: [
         {
            label: "Female",
            value: "female",
         },
         {
            label: "Male",
            value: "male",
         },
         {
            label: "Other",
            value: "other",
         },
      ],
   },
];

// Initial value formik
export const init: SignUp = {
   fullName: "",
   dob: "",
   city: "",
   region: "",
   gender: "female",
   email: "",
   username: "",
   password: "",
   confirmedPassword: "",
};
export const initDetail = {
   avatar: "",
   fullName: "",
   dob: "",
   city: "",
   region: "",
   gender: "female",
   email: "",
   username: "",
};

export const registerOptions = Yup.object().shape({
   fullName: Yup.string()
      .required(REQUIRED_MSG)
      .min(3, "Full name is least 3 characters")
      .trim()
      .matches(/^([^0-9]*)$/, "Name is invalid"),
   dob: Yup.string().required(REQUIRED_MSG),
   city: Yup.string().required(REQUIRED_MSG).min(2).trim(),
   region: Yup.string()
      .required(REQUIRED_MSG)
      .min(2)
      .trim()
      .matches(/^([^0-9]*)$/, "Region is invalid"),
   gender: Yup.string().required(REQUIRED_MSG),
   email: Yup.string().email("Email is invalid").required(REQUIRED_MSG).trim(),
   username: Yup.string()
      .matches(/^\S*$/, "Please do not use any spaces")
      .min(LENGTH_USERNAME, `User name is least ${LENGTH_USERNAME} characters`)
      .required(REQUIRED_MSG)
      .trim(),
   password: Yup.string()
      .required(REQUIRED_MSG)
      .matches(/^\S*$/, "Please do not use any spaces")
      .min(LENGTH_PASSWORD, `Please enter at least ${LENGTH_PASSWORD} characters`)
      .trim(),
   confirmedPassword: Yup.string()
      .required(REQUIRED_MSG)
      .matches(/^\S*$/, "Please do not use any spaces")
      .oneOf([Yup.ref("password")], "Confirmed password is not matched")
      .trim(),
});
