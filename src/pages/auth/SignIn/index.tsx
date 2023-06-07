import { Send } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Spinner, ChangeModeButton } from "../../../components";
import { signIn } from "../../../redux-saga/redux/actions";
import { authState$ } from "../../../redux-saga/redux/selectors";
import { init, signInOptions } from "./config";
const SignIn = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(authState$);
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
      initialValues: init,
      validationSchema: signInOptions,
      onSubmit: (values) => {
         dispatch(signIn(values));
      },
   });

   useEffect(() => {
      if (localStorage.getItem("user")) {
         const userNameLocal = JSON.parse(localStorage.getItem("user") as string)?.username;
         setFieldValue("username", userNameLocal);
      }
   }, []);
   if (payload?.accessToken) {
      return payload?.user.isAdmin ? <Navigate to="/admin" replace /> : <Navigate to="/" replace />;
   }
   return (
      <div id="sign-in">
         <Helmet>
            <title>Sign in</title>
         </Helmet>
         {/* Body */}
         <Box p={2} pl={4} pr={4}>
            {/* Form */}
            <Box position="absolute" top={5} right={5}>
               <ChangeModeButton />
            </Box>
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Typography variant="gradient" component="h1" fontSize={42} textAlign="center">
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
                  sx={{ mt: 2, color: theme.palette.white.main }}>
                  Sign in
               </Button>
            </form>
            {/* Utils */}
            <Stack mt={2} direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center">
               {/* Remember */}
               <FormControlLabel
                  name="isRemember"
                  onChange={handleChange}
                  checked={values.isRemember}
                  control={<Checkbox />}
                  label="Remember me"
               />
               <Typography>
                  <Link color={theme.palette.link.main} to="/auth/forgot-password">
                     Forgot password?
                  </Link>
               </Typography>
            </Stack>
            {/* Suggestions  */}
            <Box textAlign="center" mt={1}>
               <Typography variant="subtitle1" component="b" mr={1}>
                  Not a member?
               </Typography>
               <Link color={theme.palette.link.main} to="/auth/sign-up">
                  Sign up
               </Link>
            </Box>
         </Box>

         {/* Spinner */}
         <Spinner show={isLoading} />
      </div>
   );
};

export default SignIn;
