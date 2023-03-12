import { Send } from "@mui/icons-material";
import {
   Button,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Radio,
   RadioGroup,
   TextField,
   useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../../apis/auth";
import { Alert, DateTimePicker, Spinner } from "../../../../components";
import { hideAlert, showAlert } from "../../../../redux-saga/redux/actions";
import { alert$ } from "../../../../redux-saga/redux/selectors";
import { AlertProps } from "../../../../utils/interfaces/Props";
import { init, radioFields, registerOptions, textFields } from "../config";
const FormSignUp = ({ isAdmin = false }: { isAdmin?: boolean }) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const alert = useSelector(alert$);
   const [countries, setCountries] = useState([]);
   const [loading, setLoading] = useState<boolean>(false);
   const { title, mode, message } = alert.payload as AlertProps;
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
      useFormik({
         initialValues: init,
         validationSchema: registerOptions,
         enableReinitialize: false,
         validateOnMount: false,
         onSubmit: async (values, actions) => {
            setLoading(true);
            try {
               const res = await signUpUser({ ...values, isAdmin });
               if (res.status === 200) {
                  dispatch(
                     showAlert({
                        title: "Sign up",
                        message: "Sign up successfully",
                        mode: "success",
                     })
                  );
               } else {
                  dispatch(
                     showAlert({
                        title: "Sign up",
                        message: "Sign up failed",
                     })
                  );
               }
               setLoading(false);
            } catch (err) {
               dispatch(
                  showAlert({
                     title: "Sign up",
                     message: "Sign up failed",
                  })
               );
            }
         },
      });
   useEffect(() => {
      return () => {
         dispatch(hideAlert());
      };
   }, []);
   return (
      <>
         {/* Form */}
         <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
               {/* Text fields */}
               {textFields.map((props: any, i: number) => {
                  return (
                     <Grid key={i} item md={6} sm={6} xs={12}>
                        <TextField
                           {...props}
                           value={values[props.name]}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={errors[props.name] && touched[props.name]}
                           helperText={
                              errors[props.name] && touched[props.name] ? errors[props.name] : null
                           }
                        />
                     </Grid>
                  );
               })}
               {/* Radio fields */}
               {radioFields.map((item: any, i: number) => {
                  return (
                     <Grid key={i} item md={6} sm={6} xs={12}>
                        <FormControl>
                           <FormLabel>{item.label}</FormLabel>
                           <RadioGroup name={item.name}>
                              {item.radioes.map((radio: any, i: number) => (
                                 <FormControlLabel
                                    key={i}
                                    value={radio.value}
                                    checked={values[item.name] === radio.value}
                                    control={<Radio onChange={handleChange} onBlur={handleBlur} />}
                                    label={radio.label}
                                 />
                              ))}
                           </RadioGroup>
                        </FormControl>
                     </Grid>
                  );
               })}

               {/* Time fields */}
               <Grid item md={6} xs={12}>
                  <DateTimePicker name="dob" value="" onChange={setFieldValue} />
               </Grid>
            </Grid>

            <Button
               fullWidth
               type="submit"
               size="large"
               variant="contained"
               endIcon={<Send />}
               sx={{ marginTop: 2, color: theme.myColor.white }}>
               Sign up
            </Button>
         </form>
         {/* Alert */}
         {alert?.isShow && <Alert title={title} mode={mode} message={message} />}
         {/* Spinner */}
         {loading && <Spinner show={loading} />}
      </>
   );
};

export default memo(FormSignUp);
