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
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import { radioFields, textInfoUser } from "../../../auth/SignUp/config";
import { init, updateUserOptions } from "./config";
import Avatar from "../Heading/Avatar";
import CoverPicture from "../Heading/CoverPicture";
const Editing = () => {
   const theme = useTheme();
   const auth$ = useSelector(authState$);
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
      setFieldValue,
   } = useFormik({
      initialValues: init,
      validationSchema: updateUserOptions,
      onSubmit: (values) => {
         dispatch(updateProfile(values));
      },
   });
   useEffect(() => {
      const data = auth$.payload.user;
      setValues(data);
   }, [dispatch]);

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

            {/* Information user */}
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Stack gap={2} mt={2}>
                  {/* Cover picture */}
                  <CoverPicture user={auth$.payload.user} />

                  <Grid container spacing={4}>
                     {/* Avatar */}
                     <Grid
                        item
                        md={3}
                        xs={12}
                        display="flex"
                        sx={{
                           ".MuiAvatar-root": {
                              alignSelf: "self-start",
                           },
                        }}>
                        <Avatar user={auth$.payload.user} variant="square" borderRadius={2} />
                     </Grid>
                     {/* Input fields */}
                     <Grid container item md={9} xs={12} spacing={1}>
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
                        <Grid item sm={6} xs={12} alignItems={"center"}>
                           <Box mt={1}>
                              <CountriesSelect
                                 value={values.region}
                                 name="region"
                                 onBlur={handleBlur}
                                 onChange={setFieldValue}
                              />
                           </Box>
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
                        <Grid item sm={6} xs={12}>
                           {values?.dob && (
                              <DateTimePicker
                                 name="dob"
                                 value={values.dob}
                                 onChange={setFieldValue}
                              />
                           )}
                        </Grid>
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
               </Stack>
            </form>
         </Container>

         {/* Spinner */}
         <Spinner show={auth$.isLoading} />
      </>
   );
};

export default Editing;
