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
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Spinner } from "../../../components";
import { signIn } from "../../../redux-saga/redux/actions";
import { signInState$ } from "../../../redux-saga/redux/selectors";
import { TIME_ALERT } from "../../../utils/constants";
import { init, signInOptions } from "./config";
const SignIn = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(signInState$);
   const navigate = useNavigate();
   const [msg, setMsg] = useState<string>("");
   const [showAlert, setShowAlert] = useState<boolean>(false);
   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: init,
      validationSchema: signInOptions,
      onSubmit: (values) => {
         dispatch(signIn(values));
      },
   });

   useEffect(() => {
      // When success
      if (!isLoading && payload.status) {
         if (payload.status === 200) {
            navigate("/", {
               replace: true,
            });
         }
         // When failed
         else {
            setShowAlert(true);
            setMsg(payload.message);
            const timerId = setTimeout(() => {
               setShowAlert(false);
            }, TIME_ALERT);
            return () => {
               clearTimeout(timerId);
            };
         }
      }
   }, [isLoading, payload, dispatch]);

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
               {/* Remember */}
               <FormControlLabel
                  name="isRemember"
                  onChange={handleChange}
                  checked={values.isRemember}
                  control={<Checkbox />}
                  label="Remember me"
               />
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

         {/* Alert */}
         <Alert show={showAlert} msg={msg} onClose={() => setShowAlert(false)} />
         {/* Spinner */}
         <Spinner show={isLoading} />
      </div>
   );
};

export default SignIn;
