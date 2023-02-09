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
import { signUp } from "../../../redux-saga/redux/actions";
import { signUpState$ } from "../../../redux-saga/redux/selectors";
import { TIME_ALERT } from "../../../utils/constants";
import { init, radioFields, registerOptions, textFields } from "./config";
const SignUp = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isLoading, payload } = useSelector(signUpState$);
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
      useFormik({
         initialValues: init,
         validationSchema: registerOptions,
         onSubmit: (values) => {
            dispatch(signUp(values));
         },
      });
   const [showAlert, setShowAlert] = useState<boolean>(false);
   const [msg, setMsg] = useState<string>("");
   const [countries, setCountries] = useState([]);

   useEffect(() => {
      if (!isLoading && payload.status) {
         if (payload.status === 200) {
            navigate("/auth/sign-in");
         } else {
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

         {/* Alert */}

         <Alert show={showAlert} msg={msg} onClose={() => setShowAlert(false)} />
         {/* Spinner */}
         {isLoading && <Spinner show={isLoading} />}
      </div>
   );
};

export default SignUp;
