import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Button, Grid, Input, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "../../../../components";
import { changePasswordProfile } from "../../../../redux-saga/redux/actions";
import { profileState$, signInState$ } from "../../../../redux-saga/redux/selectors";
import { CHANGE_PASSWORD_PROFILE_SUCCESS, TIME_ALERT } from "../../../../utils/constants";
import { AlertProps } from "../../../../utils/interfaces/Props";
import { changePasswordPassword, init, textFields } from "./config";
const Password = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isLoading, payload, action, error } = useSelector(profileState$);
   const {
      payload: {
         data: {
            payload: { _id },
         },
      },
   } = useSelector(signInState$);
   const [show, setShow] = useState<boolean>(false);
   const [props, setProps] = useState<Partial<AlertProps>>({
      msg: "",
      title: "",
      mode: "error",
   });
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik(
      {
         initialValues: init,
         validationSchema: changePasswordPassword,
         onSubmit: (values) => {
            dispatch(changePasswordProfile({ ...values, _id }));
         },
      }
   );

   useEffect(() => {
      if (!isLoading && !!values.newPassword) {
         setShow(true);
         let timerId;
         if (action === CHANGE_PASSWORD_PROFILE_SUCCESS) {
            setProps({
               msg: "Create new password successfully",
               title: "Success",
               mode: "success",
            });
         } else {
            setProps({
               msg: error,
               title: "Failure",
               mode: "error",
            });
         }
         timerId = setTimeout(() => setShow(false), TIME_ALERT);
         return () => clearTimeout(timerId);
      }
   }, [isLoading, payload, action, error, dispatch]);
   return (
      <>
         <Helmet>
            <title>Change password | Young Waves</title>
         </Helmet>
         <Box bgcolor="#fff" p={3}>
            <Button
               sx={{ mb: 2 }}
               startIcon={<ArrowBackIosIcon />}
               onClick={() => navigate("/user/profile/edit")}>
               Back
            </Button>
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {textFields.map((props: any, i: number) => {
                     return (
                        <Grid key={i} item xs={12}>
                           <label htmlFor={props.name} style={{ fontWeight: 500 }}>
                              {props.label}
                           </label>
                           <Input
                              {...props}
                              id={props.name}
                              value={values[props.name] || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors[props.name] && touched[props.name]}
                           />
                           <Typography variant="subtitle2" color="error">
                              {errors[props.name] && touched[props.name]
                                 ? errors[props.name]
                                 : null}
                           </Typography>
                        </Grid>
                     );
                  })}
               </Grid>

               <Stack flexDirection="row" justifyContent="space-between" mt={2}>
                  <Button
                     startIcon={<RestartAltIcon />}
                     size="large"
                     variant="outlined"
                     onClick={() => resetForm()}>
                     Reset
                  </Button>
                  <Button type="submit" size="large" variant="contained">
                     Confirm
                  </Button>
               </Stack>
            </form>
         </Box>

         {/* Spinner */}
         <Spinner show={isLoading} />
         {/* Alert */}
         <Alert show={show} onClose={() => setShow(false)} {...props} />
      </>
   );
};

export default Password;
