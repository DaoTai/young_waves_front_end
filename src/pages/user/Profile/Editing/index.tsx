import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {
   Box,
   Button,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Modal,
   Radio,
   RadioGroup,
   TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { profileState$ } from "../../../../redux-saga/redux/selectors";
import { Helmet } from "react-helmet-async";
import { DateTimePicker } from "../../../../components";
import { radioFields, textInfoUser, init, updateUserOptions } from "../../../auth/SignUp/config";
import Password from "./Password";

const Editing = () => {
   const { isLoading, user, status } = useSelector(profileState$);
   const [open, setOpen] = useState<boolean>(false);
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
      initialValues: user || init,
      validationSchema: updateUserOptions,
      onSubmit: (values) => {
         console.log("values: ", values);
      },
   });

   useEffect(() => {
      setValues(user);
   }, [isLoading, user, status]);

   return (
      <>
         <Helmet>
            <title>Edit profile| Young Waves</title>
         </Helmet>
         {/* Content */}
         <Box>
            <Stack flexDirection="row" justifyContent="flex-end">
               <Button endIcon={<ChangeCircleIcon />} onClick={() => setOpen(true)}>
                  Change Password
               </Button>
            </Stack>
            <form autoComplete="off" onSubmit={handleSubmit}>
               <Grid container spacing={2}>
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
                     <DateTimePicker name="dob" value={values.dob} onChange={setFieldValue} />
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
         <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <>
               <Password onClose={() => setOpen(false)} />
            </>
         </Modal>
      </>
   );
};

export default Editing;
