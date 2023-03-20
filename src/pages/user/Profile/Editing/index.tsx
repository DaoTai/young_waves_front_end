import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyIcon from "@mui/icons-material/Key";
import SendIcon from "@mui/icons-material/Send";
import {
   Box,
   Button,
   Container,
   Fab,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Paper,
   Radio,
   RadioGroup,
   TextField,
   useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, ImageInput, Spinner } from "../../../../components";
import { updateProfile } from "../../../../redux-saga/redux/actions";
import { profileState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import { radioFields, textInfoUser } from "../../../auth/SignUp/config";
import { init, updateUserOptions } from "./config";
import Avatar from "../Heading/Avatar";
const Editing = () => {
   const theme = useTheme();
   const { isLoading, payload, action, error } = useSelector(profileState$);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const imageRef = useRef(Object(null));
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
      // If network slow, payload?.data'll undefined. So we shoud assign in Object
      const { fullName, dob, city, region, gender, email, _id } = Object(payload) as Profile;
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
   const handleChangeCoverPicture = (file) => {
      imageRef.current.src = file;
      dispatch(updateProfile({ coverPicture: file, _id: payload._id }));
   };

   return (
      <>
         <Helmet>
            <title>Edit profile| Young Waves</title>
         </Helmet>
         {/* Content */}
         <Container
            maxWidth="lg"
            sx={{ backgroundColor: theme.myColor.white, pt: 2, pb: 2, minHeight: "100vh" }}>
            <Stack flexDirection="row" justifyContent="space-between">
               <Fab
                  size="medium"
                  sx={{
                     boxShadow: 1,
                     bgcolor: theme.myColor.white,
                  }}
                  onClick={() => navigate(`/user/profile/${values._id}`)}>
                  <ArrowBackIosIcon />
               </Fab>
               <Button
                  variant="outlined"
                  startIcon={<KeyIcon />}
                  onClick={() => navigate("/user/profile/password")}>
                  Change Password
               </Button>
            </Stack>
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Grid container pt={2} spacing={2}>
                  <Grid
                     item
                     sm={12}
                     xs={12}
                     gap={4}
                     rowSpacing={2}
                     display="flex"
                     justifyContent="center"
                     alignItems="flex-start">
                     {/* Avatar */}
                     <Avatar user={payload} variant="square" borderRadius={2} />
                     {/* Cover picture */}
                     <Box
                        width="100%"
                        minHeight={350}
                        alignItems="center"
                        overflow="hidden"
                        position="relative"
                        borderRadius={2}
                        sx={
                           payload?.coverPicture
                              ? {
                                   backgroundImage: `url(${payload?.coverPicture})`,
                                   backgroundPosition: "center",
                                   backgroundSize: "cover",
                                   backgroundRepeat: "no-repeat",
                                }
                              : {
                                   backgroundImage: `linear-gradient(45deg, ${theme.myColor.text}, transparent)`,
                                }
                        }>
                        <Fab
                           size="small"
                           sx={{
                              backgroundColor: theme.myColor.white,
                              position: "absolute",
                              top: 5,
                              right: 5,
                              boxShadow: "none",
                           }}>
                           <ImageInput onChange={handleChangeCoverPicture} />
                        </Fab>
                     </Box>
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
                     {values?.dob && (
                        <DateTimePicker name="dob" value={values.dob} onChange={setFieldValue} />
                     )}
                  </Grid>
               </Grid>

               {/* Submit button */}
               <Button
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{ fontSize: 18, marginTop: 2, fontWeight: 500, color: theme.myColor.white }}>
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
