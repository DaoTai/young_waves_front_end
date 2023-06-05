import { Send } from "@mui/icons-material";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, useTheme } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { useFormik } from "formik";
import { signUpUser } from "../../../../apis/auth";
import { Alert, CountriesSelect, DateTimePicker, Spinner } from "../../../../components";
import { AlertProps } from "../../../../utils/interfaces/Props";
import { init, radioFields, registerOptions, textFields } from "../config";
const FormSignUp = ({ isAdmin = false }: { isAdmin?: boolean }) => {
   const theme = useTheme();
   const [showAlert, setShowAlert] = useState<boolean>(false);
   const [alert, setAlert] = useState<AlertProps>({
      title: "Sign up",
      message: "Sign up successfully",
      mode: "success",
   });
   const [loading, setLoading] = useState<boolean>(false);
   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
      initialValues: init,
      validationSchema: registerOptions,
      enableReinitialize: false,
      validateOnMount: false,
      onSubmit: async (values) => {
         setLoading(true);
         try {
            const res = await signUpUser({ ...values, isAdmin });
            setShowAlert(true);
            if (res.status === 200) {
               setAlert({
                  title: "Sign up",
                  message: "Sign up successfully",
                  mode: "success",
               });
            } else {
               setAlert({
                  title: "Sign up",
                  message: "Sign up failed",
               });
            }
            setLoading(false);
         } catch (err) {
            setShowAlert(true);
            setAlert({
               title: "Sign up",
               message: "Sign up failed",
            });
         }
      },
   });

   const onCloseAlert = useCallback(() => setShowAlert(false), []);
   return (
      <>
         {/* Form */}
         <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={2}>
               {/* Text fields */}
               {textFields.map((props: any, i: number) => {
                  return (
                     <Grid key={i} item md={6} sm={6} xs={12}>
                        <TextField
                           {...props}
                           value={values[props.name]}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           sx={{ mt: 0 }}
                           error={errors[props.name] && touched[props.name]}
                           helperText={errors[props.name] && touched[props.name] ? errors[props.name] : null}
                        />
                     </Grid>
                  );
               })}
               {/* Countries field */}
               <Grid item md={6} xs={12}>
                  <CountriesSelect name="region" onBlur={handleBlur} onChange={setFieldValue} onlyOptions />
               </Grid>
               {/* Radio fields */}
               {radioFields.map((item: any, i: number) => {
                  return (
                     <Grid key={i} item md={6} xs={12}>
                        <FormControl>
                           <FormLabel>{item.label}</FormLabel>
                           <RadioGroup name={item.name} sx={{ flexDirection: "row" }}>
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
               <Grid item md={12} xs={12}>
                  <DateTimePicker name="dob" value="" onChange={setFieldValue} />
               </Grid>
            </Grid>

            <Stack flexDirection="row" justifyContent="flex-end">
               <Button type="submit" size="large" variant="contained" endIcon={<Send />} sx={{ mt: 2, color: theme.palette.white.main }}>
                  Sign up
               </Button>
            </Stack>
         </form>
         {/* Alert */}
         {showAlert && <Alert {...alert} onClose={onCloseAlert} />}
         {/* Spinner */}
         {loading && <Spinner show={loading} />}
      </>
   );
};

export default memo(FormSignUp);
