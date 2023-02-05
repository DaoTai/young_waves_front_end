import { Box, Button, Grid, Input, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import React from "react";
import { Helmet } from "react-helmet-async";
import { textFields, init, changePasswordPassword } from "./config";
import { updateProfile } from "../../../../../redux-saga/redux/actions";
import { MyBox } from "./styles";
const Password = ({ onClose }: { onClose: () => void }) => {
   const dispatch = useDispatch();
   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: init,
      validationSchema: changePasswordPassword,
      onSubmit: (values) => {
         console.log(values);
         // dispatch(updateProfile(values));
      },
   });
   return (
      <>
         <Helmet>
            <title>Change password | Young Waves</title>
         </Helmet>
         <MyBox p={3}>
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
                  <Button size="large" variant="outlined" onClick={onClose}>
                     Cancel
                  </Button>
                  <Button type="submit" size="large" variant="contained">
                     Confirm
                  </Button>
               </Stack>
            </form>
         </MyBox>
      </>
   );
};

export default Password;
