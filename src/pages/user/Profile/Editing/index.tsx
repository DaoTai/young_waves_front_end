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
import { CountriesSelect, DateTimePicker, ImageInput, Spinner } from "../../../../components";
import { updateProfile } from "../../../../redux-saga/redux/actions";
import { profileState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import { radioFields, textInfoUser } from "../../../auth/SignUp/config";
import { init, updateUserOptions } from "./config";
import Avatar from "../Heading/Avatar";
const Editing = () => {
   const theme = useTheme();
   const { isLoading, payload } = useSelector(profileState$);
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
   }, [isLoading, payload, dispatch]);
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
                  variant="contained"
                  endIcon={<KeyIcon />}
                  sx={{
                     color: theme.myColor.white,
                  }}
                  onClick={() => navigate("/user/profile/password")}>
                  Change password
               </Button>
            </Stack>
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Grid container alignItems="center" pt={2} spacing={2}>
                  {/* Images */}
                  <Grid
                     item
                     sm={12}
                     xs={12}
                     gap={1}
                     rowSpacing={2}
                     display="flex"
                     justifyContent="center"
                     alignItems="flex-start"
                     flexWrap="wrap">
                     {/* Cover picture */}
                     <Box
                        width="100%"
                        minHeight={400}
                        alignItems="center"
                        overflow="hidden"
                        position="relative"
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
                              top: 10,
                              right: 10,
                              boxShadow: "none",
                           }}>
                           <ImageInput onChange={handleChangeCoverPicture} />
                        </Fab>
                     </Box>
                     {/* Avatar */}
                     <Avatar user={payload} variant="square" borderRadius={2} />
                  </Grid>

                  {/* Text fields */}
                  {textInfoUser.map((props: any, i: number) => {
                     return (
                        <Grid key={i} item sm={6} xs={12}>
                           <TextField
                              {...props}
                              sx={{ mt: 1 }}
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

                  {/* Countries field */}
                  <Grid item sm={6} xs={12}>
                     <CountriesSelect
                        value={values.region}
                        name="region"
                        onBlur={handleBlur}
                        onChange={setFieldValue}
                        error={!!(errors["region"] && touched["region"])}
                        helperText={errors["region"] && touched["region"] ? errors["region"] : null}
                     />
                  </Grid>
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
                  <Grid item sm={12} xs={12}>
                     {values?.dob && (
                        <DateTimePicker name="dob" value={values.dob} onChange={setFieldValue} />
                     )}
                  </Grid>
               </Grid>

               {/* Submit button */}
               <Stack mt={2} flexDirection="row" justifyContent="flex-end">
                  <Button
                     type="submit"
                     size="large"
                     variant="contained"
                     endIcon={<SendIcon />}
                     sx={{
                        color: theme.myColor.white,
                     }}>
                     Update
                  </Button>
               </Stack>
            </form>
         </Container>

         {/* Spinner */}
         <Spinner show={isLoading} />
      </>
   );
};

export default Editing;
