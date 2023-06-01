import SendIcon from "@mui/icons-material/Send";
import { Button, Paper, Stack, TextField, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../apis/auth";
import { Spinner } from "../../../components";
import { forgotPasswordSchema, init } from "./config";
import { showAlert } from "../../../redux-saga/redux/actions";

const ForgotPassword = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [loading, setLoading] = useState<boolean>(false);
   const theme = useTheme();
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset } =
      useFormik({
         initialValues: init,
         validationSchema: forgotPasswordSchema,
         onSubmit: async (values, e) => {
            setLoading(true);
            try {
               const res = await forgotPassword(values);
               if (res.statusText === "OK") {
                  handleReset(e);
                  dispatch(
                     showAlert({
                        title: "Forgot password",
                        mode: "success",
                        message: "Please check your email instantly!",
                     })
                  );
               }
            } catch (err: any) {
               console.log("error: ", err);
            }
            setLoading(false);
         },
      });

   return (
      <>
         <Helmet>
            <title>Young Waves</title>
         </Helmet>
         <Paper id="forgot-password" sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
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
                  name="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  size="medium"
                  placeholder="Enter email"
                  fullWidth
                  error={(errors.email && touched.email) as boolean}
                  value={values.email}
                  helperText={errors.email && touched.email ? errors.email : null}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />
               <Stack flexDirection="row" justifyContent="space-between">
                  <Button
                     variant="outlined"
                     onClick={() => navigate(-1)}
                     sx={{
                        color: theme.palette.primary.main,
                        bgcolor: theme.myColor.white,
                        mt: 2,
                     }}>
                     Cancel
                  </Button>
                  <Button
                     type="submit"
                     variant="contained"
                     endIcon={<SendIcon />}
                     sx={{ color: theme.myColor.white, mt: 2 }}>
                     Send
                  </Button>
               </Stack>
            </form>
         </Paper>
         {/* Spinner */}
         <Spinner show={loading} />
      </>
   );
};

export default ForgotPassword;
