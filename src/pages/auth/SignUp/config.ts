import * as Yup from "yup";
import { TextField, RadioField, SignUp } from "../../../utils/interfaces/Auth";
import { REQUIRED_MSG, LENGTH_PASSWORD } from "../../../utils/constants";
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
      name: "region",
      type: "text",
      label: "Region",
      variant: "outlined",
      margin: "normal",
      size: "medium",
      placeholder: "Enter your region",
      required: true,
      fullWidth: true,
      autoComplete: "off",
   },
   {
      name: "address",
      type: "text",
      label: "Address",
      variant: "outlined",
      margin: "normal",
      size: "medium",
      placeholder: "Enter your address",
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
      ],
   },
];

// Initial value formik
export const init: SignUp = {
   validateOnMount: true,
   fullName: "",
   dob: "",
   address: "",
   region: "",
   gender: "female",
   email: "",
   username: "",
   password: "",
   confirmedPassword: "",
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

export const registerOptions = Yup.object().shape({
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
   username: Yup.string().required(REQUIRED_MSG).trim(),
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
