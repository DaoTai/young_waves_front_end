import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckIcon from "@mui/icons-material/Check";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
   Box,
   Button,
   Container,
   Fab,
   Grid,
   Input,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog, Spinner } from "../../../../components";
import { changePasswordProfile } from "../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { changePasswordPassword, init, textFields } from "./config";
const Password = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const auth$ = useSelector(authState$);
   const [openDialog, setOpenDialog] = useState<boolean>(false);

   const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik(
      {
         initialValues: init,
         validationSchema: changePasswordPassword,
         onSubmit: (values) => {
            dispatch(changePasswordProfile({ ...values, _id: auth$.payload?.user._id }));
         },
      }
   );
   useEffect(() => {
      resetForm();
   }, [auth$, dispatch]);
   const handleConfirm = () => {
      handleSubmit();
      setOpenDialog(false);
   };
   return (
      <>
         <Helmet>
            <title>Change password | Young Waves</title>
         </Helmet>
         <Container maxWidth="md" sx={{ backgroundColor: theme.myColor.white, pt: 1 }}>
            <Stack flexDirection="row" alignItems="baseline">
               <Fab
                  size="medium"
                  sx={{
                     boxShadow: 1,
                     bgcolor: theme.myColor.white,
                  }}
                  onClick={() => navigate("/user/profile/edit")}>
                  <ArrowBackIosIcon />
               </Fab>

               <Typography flex={2} variant="h4" textAlign="center">
                  Change Password
               </Typography>
            </Stack>
            <Box p={2} bgcolor={theme.myColor.white}>
               <form autoComplete="off" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                     {textFields.map((props: any, i: number) => {
                        return (
                           <Grid key={i} item xs={12}>
                              <Typography
                                 variant="body1"
                                 component="label"
                                 htmlFor={props.name}
                                 sx={{ cursor: "pointer", pb: 1, display: "block" }}>
                                 {props.label}
                              </Typography>
                              <Input
                                 {...props}
                                 id={props.name}
                                 value={values[props.name] || ""}
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 error={errors[props.name] && touched[props.name]}
                              />
                              <Typography variant="subtitle2" color="error" sx={{ mt: 1 }}>
                                 {errors[props.name] && touched[props.name]
                                    ? errors[props.name]
                                    : null}
                              </Typography>
                           </Grid>
                        );
                     })}
                  </Grid>

                  {/* Actions */}
                  <Stack flexDirection="row" justifyContent="space-between" mt={2}>
                     <Button
                        endIcon={<RestartAltIcon />}
                        size="large"
                        variant="outlined"
                        onClick={() => resetForm()}>
                        Reset
                     </Button>
                     <Button
                        size="large"
                        variant="contained"
                        endIcon={<CheckIcon />}
                        onClick={() => setOpenDialog(true)}>
                        Confirm
                     </Button>
                  </Stack>
               </form>
            </Box>
         </Container>

         {/* Dialog confirm */}
         <Dialog
            open={openDialog}
            title="Change Password"
            content="Do you agree to change password?"
            onClose={() => setOpenDialog(false)}
            onSubmit={handleConfirm}
         />

         {/* Spinner */}
         <Spinner show={auth$.isLoading} />
      </>
   );
};

export default Password;
