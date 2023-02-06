import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Alert, DateTimePicker, Spinner } from "../../../../components";
import { updateProfile } from "../../../../redux-saga/redux/actions";
import { profileState$ } from "../../../../redux-saga/redux/selectors";
import { TIME_ALERT, UPDATE_PROFILE_SUCCESS } from "../../../../utils/constants";
import { radioFields, textInfoUser } from "../../../auth/SignUp/config";
import { Profile } from "../../../../utils/interfaces/Profile";
import { updateUserOptions, init } from "./config";
import Avatar from "../Heading/Avatar";

const Editing = () => {
   const { isLoading, payload, action, error } = useSelector(profileState$);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [showAlert, setShowAlert] = useState<boolean>(false);
   const [msg, setMsg] = useState<string>("");
   const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setValues,
      setFieldValue,
   } = useFormik({
      initialValues: init,
      validationSchema: updateUserOptions,
      onSubmit: (values) => {
         dispatch(updateProfile(values));
      },
   });
   useEffect(() => {
      let timerId = 0;
      // If network slow, payload?.data'll undefined. So we shoud assign in Object
      const { fullName, dob, address, region, gender, email, _id } = Object(
         payload?.data
      ) as Profile;
      setValues({
         _id,
         fullName,
         dob,
         address,
         region,
         gender,
         email,
      });
      if (!isLoading && !!values.fullName) {
         if (action === UPDATE_PROFILE_SUCCESS) {
            setShowAlert(true);
            setMsg("Edited succesfully");
         } else {
            setShowAlert(true);
            setMsg("Edited failed");
         }
         timerId = setTimeout(() => setShowAlert(false), TIME_ALERT);
      }
      return () => {
         clearTimeout(timerId);
      };
   }, [isLoading, payload, dispatch]);

   return (
      <>
         <Helmet>
            <title>Edit profile| Young Waves</title>
         </Helmet>
         {/* Content */}
         <Box>
            <Stack flexDirection="row" justifyContent="space-between">
               <Button
                  startIcon={<ArrowBackIosIcon />}
                  onClick={() => navigate(`/user/profile/${values._id}`)}>
                  Back
               </Button>
               <Button
                  endIcon={<ChangeCircleIcon />}
                  onClick={() => navigate("/user/profile/password")}>
                  Change Password
               </Button>
            </Stack>
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {/* Avatar */}
                  <Grid item sm={12} xs={12} display="flex" justifyContent="center">
                     <Avatar image={payload?.data?.avatar} />
                  </Grid>
                  {/* Text fields */}
                  {textInfoUser.map((props: any, i: number) => {
                     return (
                        <Grid key={i} item sm={6} xs={12}>
                           <TextField
                              {...props}
                              value={values[props.name] || ""}
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
                        <Grid key={i} item md={6} xs={12}>
                           <FormControl>
                              <FormLabel>{item.label}</FormLabel>
                              <RadioGroup name={item.name}>
                                 {item.radioes.map((radio: any, i: number) => {
                                    return (
                                       <FormControlLabel
                                          key={i}
                                          value={radio.value}
                                          checked={values[item.name] === radio.value}
                                          control={<Radio />}
                                          label={radio.label}
                                          onChange={handleChange}
                                       />
                                    );
                                 })}
                              </RadioGroup>
                           </FormControl>
                        </Grid>
                     );
                  })}

                  {/* Time fields */}
                  <Grid item md={6} xs={12}>
                     <DateTimePicker name="dob" value={values?.dob} onChange={setFieldValue} />
                  </Grid>
               </Grid>

               {/* Submit button */}
               <Button
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{ marginTop: 2 }}>
                  Update
               </Button>
            </form>
         </Box>

         {/* Password modal */}

         {/* Alert */}
         <Alert
            show={showAlert}
            title="Success"
            mode="success"
            msg={msg}
            onClose={() => setShowAlert(false)}
         />
         {/* Spinner */}
         <Spinner show={isLoading} />
      </>
   );
};

export default Editing;
