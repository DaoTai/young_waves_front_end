import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Fab, Paper, Stack, TextField, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import { forgotPassword } from "../../../apis/auth";
import { forgotPasswordSchema, init } from "./config";
import { useCallback, useState } from "react";
import { AlertProps } from "../../../utils/interfaces/Props";
import { Alert, Spinner } from "../../../components";

const ForgotPassword = () => {
   const navigate = useNavigate();
   const [alert, setAlert] = useState<AlertProps>({
      title: "Forgot Password",
      message: "",
      mode: "success",
   });
   const [showAlert, setShowAlert] = useState<boolean>(false);
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
               handleReset(e);
               setAlert({
                  title: "Forgot password",
                  mode: "success",
                  message: res.data,
               });
               setShowAlert(true);
               setTimeout(() => {
                  navigate("/auth/sign-in");
               }, 4000);
            } catch (err: any) {
               setAlert({
                  title: "Forgot password",
                  mode: "error",
                  message: "Failed",
               });
               setShowAlert(true);
               throw new Error(err);
            }
            setLoading(false);
         },
      });

   const onCloseAlert = useCallback(() => {
      setShowAlert(false);
   }, []);

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
         {showAlert && <Alert {...alert} onClose={onCloseAlert} />}
         {/* Spinner */}
         <Spinner show={loading} />
      </>
   );
};

export default ForgotPassword;
