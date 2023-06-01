import { Send } from "@mui/icons-material";
import {
   Box,
   Button,
   Checkbox,
   FormControlLabel,
   Stack,
   TextField,
   Typography,
   useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Alert, Spinner } from "../../../components";
import { signIn } from "../../../redux-saga/redux/actions";
import { alertState$, authState$ } from "../../../redux-saga/redux/selectors";
import { init, signInOptions } from "./config";
const SignIn = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(authState$);
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
      useFormik({
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
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Typography
                  variant="h3"
                  textAlign="center"
                  sx={{
                     background: theme.myColor.bgGradient,
                     WebkitBackgroundClip: "text",
                     WebkitTextFillColor: "transparent",
                     pb: 1,
                  }}>
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
                  sx={{ marginTop: 2, color: theme.myColor.white }}>
                  Sign in
               </Button>
            </form>
            {/* Utils */}
            <Stack
               mt={2}
               direction={{ md: "row", sm: "column", xs: "column" }}
               justifyContent={{ md: "space-between", sm: "space-between", xs: "flex-start" }}
               alignItems={{ md: "center", sm: "flex-start", xs: "flex-start" }}>
               {/* Remember */}
               <FormControlLabel
                  name="isRemember"
                  onChange={handleChange}
                  checked={values.isRemember}
                  control={<Checkbox />}
                  label="Remember me"
               />
               <Typography>
                  <Link color={theme.myColor.link} to="/auth/forgot-password">
                     Forgot password?
                  </Link>
               </Typography>
            </Stack>
            {/* Suggestions  */}
            <Box textAlign="center" mt={1}>
               <Typography variant="subtitle1" component="b" mr={1}>
                  Not a member?
               </Typography>
               <Link color={theme.myColor.link} to="/auth/sign-up">
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
