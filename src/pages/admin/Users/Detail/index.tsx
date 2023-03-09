import { useState, useEffect } from "react";
import { Profile } from "../../../../utils/interfaces/Profile";

import { MyBox } from "../../../../components/Post/Modal/styles";
import { CloseButton } from "../../../../components";
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
} from "@mui/material";
import { useFormik } from "formik";
import { initDetail, radioFields, textInfoUser } from "../../../auth/SignUp/config";
import { updateUserOptions } from "../../../user/Profile/Editing/config";
import { ImageInput } from "../../../../components";
import { WrapAvatar } from "../../../user/Profile/Heading/styles";
const DetailUser = ({
   user,
   open,
   onClose,
}: {
   user: Profile;
   open: boolean;
   onClose: () => void;
}) => {
   const [avatar, setAvatar] = useState<string>("");
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik(
      {
         initialValues: initDetail,
         validationSchema: updateUserOptions,
         onSubmit: (values) => {},
      }
   );
   useEffect(() => {
      setValues(user);
      setAvatar(user.avatar);
   }, []);

   const handleChangeAvatar = (file) => {
      setAvatar(file);
   };

   return (
      <Modal open={open} onClose={onClose}>
         <MyBox>
            {/* Heading */}
            <Typography variant="h3" component="h2" textAlign="center" pb={1}>
               Detail user
            </Typography>
            <CloseButton onClick={onClose} size="large" />
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {/* Avatar */}
                  <Grid item sm={12} xs={12} display="flex" justifyContent="center">
                     <WrapAvatar>
                        <Avatar src={avatar} sx={{ width: 250, height: 250 }} />
                        <ImageInput onChange={handleChangeAvatar} />
                     </WrapAvatar>
                  </Grid>
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
         </MyBox>
      </Modal>
   );
};

export default DetailUser;
