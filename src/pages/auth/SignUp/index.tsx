import { Send } from "@mui/icons-material";
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
   useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, DateTimePicker, Spinner } from "../../../components";
import { hideAlert, signUp } from "../../../redux-saga/redux/actions";
import { alert$, signUpState$ } from "../../../redux-saga/redux/selectors";
import { AlertProps } from "../../../utils/interfaces/Props";
import { init, radioFields, registerOptions, textFields } from "./config";
const SignUp = () => {
   const theme = useTheme();
   const navigate = useNavigate();
   const alert = useSelector(alert$);
   const { title, mode, message } = alert.payload as AlertProps;
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(signUpState$);
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
      useFormik({
         initialValues: init,
         validationSchema: registerOptions,
         onSubmit: (values) => {
            dispatch(signUp(values));
         },
      });

   const [countries, setCountries] = useState([]);
   useEffect(() => {
      return () => {
         dispatch(hideAlert());
      };
   }, []);

   useEffect(() => {
      if (payload?.status === 200) {
         navigate("/auth/sign-in");
         return () => {
            // Assign status in order to be permitted backed sign-up page from sign-in
            // Cuz if status == 200, navigate always execute!!
            if (payload.status) {
               payload.status = 0;
            }
         };
      }
   }, [payload]);

   // useEffect(() => {
   //    fetch("https://restcountries.com/v3.1/all")
   //       .then((res) => res.json())
   //       .then((data) => {
   //          const newData = data.map((item) => {
   //             return {
   //                name: item.name.common,
   //                image: item.flags.png,
   //             };
   //          });
   //          setCountries(newData);
   //       })
   //       .catch((err) => console.error(err));
   // }, []);

   // if (payload?.status === 200) {
   //    return <Navigate to="/auth/sign-in" />;
   // }

   return (
      <div id="sign-up">
         <Helmet>
            <title>Sign up</title>
         </Helmet>
         {/* Alert */}
         {alert?.isShow && <Alert title={title} mode={mode} message={message} />}
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
                  sx={{ marginTop: 2, color: theme.myColor.white }}>
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

         {/* Spinner */}
         {isLoading && <Spinner show={isLoading} />}
      </div>
   );
};

export default SignUp;
