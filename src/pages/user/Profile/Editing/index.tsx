import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {
   Button,
   Container,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Radio,
   RadioGroup,
   TextField
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../../components";
import { updateProfile } from "../../../../redux-saga/redux/actions";
import { profileState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import { radioFields, textInfoUser } from "../../../auth/SignUp/config";
import Avatar from "../Heading/Avatar";
import { init, updateUserOptions } from "./config";

const Editing = () => {
   const { isLoading, payload, action, error } = useSelector(profileState$);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setValues,
   } = useFormik({
      initialValues: init,
      validationSchema: updateUserOptions,
      onSubmit: (values) => {
         dispatch(updateProfile(values));
      },
   });
   useEffect(() => {
      // If network slow, payload?.data'll undefined. So we shoud assign in Object
      const { fullName, dob, city, region, gender, email, _id } = Object(payload?.data) as Profile;
      setValues({
         _id,
         fullName,
         dob,
         city,
         region,
         gender,
         email,
      });
   }, [isLoading, payload, dispatch, action]);

   return (
      <>
         <Helmet>
            <title>Edit profile| Young Waves</title>
         </Helmet>
         {/* Content */}
         <Container maxWidth="md">
            <Stack flexDirection="row" justifyContent="space-between">
               <Button
                  variant="outlined"
                  startIcon={<ArrowBackIosIcon />}
                  onClick={() => navigate(`/user/profile/${values._id}`)}>
                  Back
               </Button>
               <Button
                  variant="outlined"
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
                     {/* {values?.dob && (
                        <DateTimePicker name="dob" value={values.dob} onChange={setFieldValue} />
                     )} */}
                     <TextField fullWidth name="dob" value={values.dob} />
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
         </Container>

         {/* Spinner */}
         <Spinner show={isLoading} />
      </>
   );
};

export default Editing;
