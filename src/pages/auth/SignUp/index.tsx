import {
   Box,
   Button,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Radio,
   RadioGroup,
   TextField,
   Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Send } from "@mui/icons-material";

import DateTimePicker from "../../../components/DateTimePicker";
import { radioFields, textFields, init, registerOptions } from "./config";
const SignUp = () => {
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
      useFormik({
         initialValues: init,
         validationSchema: registerOptions,
         onSubmit: (values) => {
            console.log("Values: ", values);
         },
      });

   return (
      <div id="sign-up">
         <Helmet>
            <title>Sign up</title>
         </Helmet>
         {/* Body */}
         <Box p={4} paddingTop={1} paddingBottom={2}>
            {/* Form */}
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Typography variant="h3" textAlign="center" color="primary">
                  Sign up
               </Typography>
               <Grid container spacing={2}>
                  {/* Text fields */}
                  {textFields.map((props: any, i: number) => {
                     return (
                        <Grid key={i} item md={6} sm={6} xs={12}>
                           <TextField
                              {...props}
                              value={values[props.name]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors[props.name] && touched[props.name]}
                              helperText={
                                 errors[props.name] && touched[props.name]
                                    ? errors[props.name]
                                    : null
                              }
                           />
                        </Grid>
                     );
                  })}
                  {/* Radio fields */}
                  {radioFields.map((item: any, i: number) => {
                     return (
                        <Grid key={i} item md={6} sm={6} xs={12}>
                           <FormControl>
                              <FormLabel>{item.label}</FormLabel>
                              <RadioGroup name={item.name}>
                                 {item.radioes.map((radio: any, i: number) => (
                                    <FormControlLabel
                                       key={i}
                                       value={radio.value}
                                       checked={values[item.name] === radio.value}
                                       control={
                                          <Radio onChange={handleChange} onBlur={handleBlur} />
                                       }
                                       label={radio.label}
                                    />
                                 ))}
                              </RadioGroup>
                           </FormControl>
                        </Grid>
                     );
                  })}

                  {/* Time fields */}
                  <Grid item md={6} xs={12}>
                     <DateTimePicker name="dob" onChange={setFieldValue} />
                  </Grid>
               </Grid>

               <Button
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                  endIcon={<Send />}
                  sx={{ marginTop: 2 }}>
                  Sign up
               </Button>
            </form>

            {/* Suggest */}
            <Box mt={3} textAlign="center">
               <Typography variant="subtitle1" component="b" mr={1}>
                  Have already an account?
               </Typography>
               <Link to="/auth/sign-in">Sign in</Link>
            </Box>
         </Box>
      </div>
   );
};

export default SignUp;
