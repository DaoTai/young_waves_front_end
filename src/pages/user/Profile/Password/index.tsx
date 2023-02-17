import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
   Box,
   Button,
   Container,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Grid,
   Input,
   Stack,
   Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../../components";
import { changePasswordProfile } from "../../../../redux-saga/redux/actions";
import { profileState$, signInState$ } from "../../../../redux-saga/redux/selectors";
import { changePasswordPassword, init, textFields } from "./config";
const Password = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isLoading, payload, action, error } = useSelector(profileState$);
   const {
      payload: {
         data: {
            payload: { _id },
         },
      },
   } = useSelector(signInState$);
   const [openDialog, setOpenDialog] = useState<boolean>(false);

   const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik(
      {
         initialValues: init,
         validationSchema: changePasswordPassword,
         onSubmit: (values) => {
            dispatch(changePasswordProfile({ ...values, _id }));
         },
      }
   );
   useEffect(() => {
      resetForm();
   }, [isLoading, payload, action, error, dispatch]);
   const handleConfirm = () => {
      handleSubmit();
      setOpenDialog(false);
   };
   return (
      <>
         <Helmet>
            <title>Change password | Young Waves</title>
         </Helmet>
         <Container maxWidth="md">
            <Button
               variant="outlined"
               startIcon={<ArrowBackIosIcon />}
               onClick={() => navigate("/user/profile/edit")}>
               Back
            </Button>
            <Typography variant="h4" mb={2} textAlign="center">
               Change Password
            </Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {textFields.map((props: any, i: number) => {
                     return (
                        <Grid key={i} item xs={12}>
                           <label htmlFor={props.name} style={{ fontWeight: 500 }}>
                              {props.label}
                           </label>
                           <Input
                              {...props}
                              id={props.name}
                              value={values[props.name] || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors[props.name] && touched[props.name]}
                           />
                           <Typography variant="subtitle2" color="error">
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
                     startIcon={<RestartAltIcon />}
                     size="large"
                     variant="outlined"
                     onClick={() => resetForm()}>
                     Reset
                  </Button>
                  <Button size="large" variant="contained" onClick={() => setOpenDialog(true)}>
                     Confirm
                  </Button>
               </Stack>
            </form>
         </Container>

         {/* Dialog confirm */}
         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>
               <Typography variant="h6" textAlign="center">
                  Change Password
               </Typography>
            </DialogTitle>
            <DialogContent>
               <DialogContentText>Do you agree to change password?</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
               <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Cancel
               </Button>
               <Button type="submit" onClick={handleConfirm}>
                  Agree
               </Button>
            </DialogActions>
         </Dialog>

         {/* Spinner */}
         <Spinner show={isLoading} />
      </>
   );
};

export default Password;
