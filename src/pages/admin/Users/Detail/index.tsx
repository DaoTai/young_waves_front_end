import SendIcon from "@mui/icons-material/Send";
import { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Radio,
   RadioGroup,
   TextField,
   Button,
   Typography,
   Modal,
   Avatar,
   useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { Profile } from "../../../../utils/interfaces/Profile";
import { MyBox } from "../../../../components/Post/Modal/styles";
import * as api from "../../../../apis";
import { showAlert } from "../../../../redux-saga/redux/actions";
import { initDetail, radioFields, textInfoUser } from "../../../auth/SignUp/config";
import { updateUserOptions } from "../../../user/Profile/Editing/config";
import {
   ImageInput,
   CloseButton,
   DateTimePicker,
   OverlayFullImage,
   CountriesSelect,
} from "../../../../components";
import { WrapAvatar } from "../../../user/Profile/Heading/styles";
import { Link } from "react-router-dom";

const DetailUser = ({
   user,
   open,
   onClose,
}: {
   user: Profile;
   open: boolean;
   onClose: () => void;
}) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const [avatar, setAvatar] = useState<string>("");
   const [showFullAvatar, setShowFullAvatar] = useState<boolean>(false);
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
      initialValues: initDetail,
      validationSchema: updateUserOptions,
      onSubmit: async (values: Partial<Profile>) => {
         const res = await api.admin.editUser({ ...values, avatar });
         if (res.status === 200) {
            dispatch(
               showAlert({
                  title: "Update user",
                  message: "Update user successfully",
                  mode: "success",
               })
            );
         } else {
            dispatch(
               showAlert({
                  title: "Update user",
                  message: "Update user failed",
                  mode: "error",
               })
            );
         }
      },
   });
   useEffect(() => {
      setValues(user);
      setAvatar(user.avatar);
   }, [user]);

   const handleChangeAvatar = (file) => {
      setAvatar(file);
   };

   const onOpenFullImage = () => setShowFullAvatar(true);
   const onCloseFullImage = () => setShowFullAvatar(false);

   return (
      <Modal open={open} onClose={onClose}>
         <>
            <MyBox width="100vw" height="100vh">
               {/* Heading */}
               <Typography variant="h3" component="h2" textAlign="center" pb={1}>
                  Detail user
               </Typography>
               <CloseButton onClick={onClose} size="large" />
               <form autoComplete="off" onSubmit={handleSubmit}>
                  <Grid container spacing={2} alignItems="flex-start">
                     {/* Avatar */}
                     <Grid
                        item
                        md={3}
                        xs={12}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center">
                        <WrapAvatar>
                           <Avatar
                              variant="square"
                              src={avatar}
                              sx={{
                                 width: "100%",
                                 height: "100%",
                                 objectFit: "fill",
                                 borderRadius: 2,
                              }}
                              onClick={onOpenFullImage}
                           />
                        </WrapAvatar>
                        <ImageInput onChange={handleChangeAvatar} />
                        <Typography
                           variant="body1"
                           letterSpacing={2}
                           fontSize={18}
                           textAlign="center"
                           mt={2}
                           sx={{ color: theme.palette.primary.main }}>
                           <Link to={`/user/explore/${values._id}`}>Go to explore</Link>
                        </Typography>
                     </Grid>
                     <Grid item md={9} xs={12}>
                        <Grid container spacing={2} alignItems="center">
                           {/* Text fields */}
                           {textInfoUser.map((props: any, i: number) => {
                              return (
                                 <Grid key={i} item sm={6} xs={12}>
                                    <TextField
                                       {...props}
                                       value={values[props.name] || " "}
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
                                 <DateTimePicker
                                    name="dob"
                                    value={values.dob}
                                    onChange={setFieldValue}
                                 />
                              )}
                           </Grid>
                           <Grid item md={6} xs={12}>
                              <Typography
                                 variant="body1"
                                 component="label"
                                 sx={{ mb: "12px", color: "rgba(0,0,0,0.6)" }}
                                 display="block">
                                 Region
                              </Typography>
                              {/* Countries field */}
                              <CountriesSelect
                                 value={values.region}
                                 name="region"
                                 onBlur={handleBlur}
                                 onChange={setFieldValue}
                              />
                           </Grid>
                           {/* Submit button */}
                           <Grid item md={6} xs={12} sx={{ mt: 2 }}>
                              <Button
                                 type="submit"
                                 size="large"
                                 variant="contained"
                                 endIcon={<SendIcon />}>
                                 Update
                              </Button>
                           </Grid>
                        </Grid>
                     </Grid>
                  </Grid>
               </form>
            </MyBox>
            <OverlayFullImage open={showFullAvatar} src={user?.avatar} onClose={onCloseFullImage} />
         </>
      </Modal>
   );
};

export default memo(DetailUser);
