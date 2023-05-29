import SendIcon from "@mui/icons-material/Send";
import {
   Avatar,
   Button,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Modal,
   Radio,
   RadioGroup,
   TextField,
   Typography,
   useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
   CloseButton,
   CountriesSelect,
   DateTimePicker,
   ImageInput,
   OverlayFullImage,
   Spinner,
} from "../../../../components";
import { MyBox } from "../../../../components/Post/Modal/styles";
import { Profile, UpdateProfile } from "../../../../utils/interfaces/Profile";
import { initDetail, radioFields, textInfoUser } from "../../../auth/SignUp/config";
import { updateUserOptions } from "../../../user/Profile/Editing/config";
import { WrapAvatar } from "../../../user/Profile/Heading/styles";

interface Props {
   user: Profile;
   isLoading?: boolean;
   onClose: () => void;
   onSubmit: (values: UpdateProfile) => void;
}

const DetailUser = ({ user, isLoading = false, onClose, onSubmit }: Props) => {
   const theme = useTheme();
   const [avatar, setAvatar] = useState<File>();
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
         onSubmit({
            ...values,
            newAvatar: avatar as File,
            deletedImages: [user.avatar],
         });
      },
   });
   useEffect(() => {
      setValues(user);
      const onCloseShort = (e: KeyboardEvent) => {
         e.key === "Escape" && onClose();
      };
      window.addEventListener("keydown", onCloseShort);
      return () => {
         window.removeEventListener("keydown", onCloseShort);
      };
   }, [user]);

   useEffect(() => {
      return () => {
         values.avatar && URL.revokeObjectURL(values.avatar);
      };
   }, [values.avatar]);

   const handleChangeAvatar = (files: FileList) => {
      const file = files[0];
      setAvatar(file);
      setFieldValue("avatar", URL.createObjectURL(file));
   };

   const onOpenFullImage = () => setShowFullAvatar(true);
   const onCloseFullImage = () => setShowFullAvatar(false);

   return (
      <Modal open onClose={onClose}>
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
                              src={values.avatar}
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
            <Spinner show={isLoading} />
         </>
      </Modal>
   );
};

export default memo(DetailUser);
