import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Send } from "@mui/icons-material";
import {
   Box,
   Button,
   Checkbox,
   FormControlLabel,
   Stack,
   TextField,
   Typography,
} from "@mui/material";
import { signInState$ } from "../../../redux-saga/redux/selectors";
import { signIn } from "../../../redux-saga/redux/actions";
import { init, signInOptions } from "./config";
const SignIn = () => {
   const dispatch = useDispatch();
   const signInData = useSelector(signInState$);
   const navigate = useNavigate();
   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: init,
      validationSchema: signInOptions,
      onSubmit: (values) => {
         dispatch(signIn(values));
      },
   });

   useEffect(() => {
      if (signInData.payload.status === 200) {
         navigate("/", {
            replace: true,
         });
      }
   }, [signInData, dispatch]);

   return (
      <div id="sign-in">
         <Helmet>
            <title>Sign in</title>
         </Helmet>
         {/* Body */}
         <Box p={4} paddingTop={4} paddingBottom={4}>
            {/* Form */}
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Typography variant="h3" textAlign="center" color="primary">
                  Sign in
               </Typography>
               <TextField
                  name="username"
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  size="medium"
                  placeholder="Enter username"
                  fullWidth
                  autoFocus
                  error={(errors.username && touched.username) as boolean}
                  value={values.username}
                  helperText={errors.username && touched.username ? errors.username : null}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />

               <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  fullWidth
                  size="medium"
                  placeholder="Enter password"
                  error={!!(errors.password && touched.password) as boolean}
                  value={values.password}
                  helperText={errors.password && touched.password ? errors.password : null}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />

               <Button
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                  endIcon={<Send />}
                  sx={{ marginTop: 2 }}>
                  Submit
               </Button>
            </form>
            {/* Utils */}
            <Stack
               mt={2}
               direction={{ md: "row", sm: "column", xs: "column" }}
               justifyContent={{ md: "space-between", sm: "space-between", xs: "flex-start" }}
               alignItems={{ md: "center", sm: "flex-start", xs: "flex-start" }}>
               <FormControlLabel control={<Checkbox />} label="Remember me" />
               <Typography>
                  <Link to="/">Forgot password?</Link>
               </Typography>
            </Stack>
            <Box textAlign="center" mt={2}>
               <Typography variant="subtitle1" component="b" mr={1}>
                  Not a member?
               </Typography>
               <Link to="/auth/sign-up">Sign up</Link>
            </Box>
         </Box>
      </div>
   );
};

export default SignIn;
