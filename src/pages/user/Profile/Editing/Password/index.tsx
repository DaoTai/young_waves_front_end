import { Box, Button, Grid, Input, Stack } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { textFields } from "./config";
import { MyBox } from "./styles";
const Password = ({ onClose }: { onClose: () => void }) => {
   const handleSubmit = (e) => {};
   return (
      <>
         <Helmet>
            <title>Change password | Young Waves</title>
         </Helmet>
         <MyBox p={3}>
            <form autoComplete="off" onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
               <Grid container spacing={2}>
                  {textFields.map((props: any, i: number) => {
                     return (
                        <Grid key={i} item xs={12}>
                           <label htmlFor={props.name} style={{ fontWeight: 500 }}>
                              {props.label}
                           </label>
                           <Input {...props} />
                        </Grid>
                     );
                  })}
               </Grid>

               <Stack flexDirection="row" justifyContent="space-between" mt={2}>
                  <Button size="large" variant="outlined" onClick={onClose}>
                     Cancel
                  </Button>
                  <Button type="submit" size="large" variant="contained">
                     Confirm
                  </Button>
               </Stack>
            </form>
         </MyBox>
      </>
   );
};

export default Password;
