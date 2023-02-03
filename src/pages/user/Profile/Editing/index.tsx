import {
   Box,
   Button,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Radio,
   RadioGroup,
   TextField,
   Modal,
   Input,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Helmet } from "react-helmet-async";
import { textInfoUser, radioFields } from "../../../auth/SignUp/config";
import { useState } from "react";
import { DateTimePicker } from "../../../../components";
import Password from "./Password";
import { MyBox } from "./Password/styles";
import { textFields } from "./Password/config";
import { Stack } from "@mui/system";

const Editing = () => {
   const [open, setOpen] = useState<boolean>(false);
   const handleSubmit = (e) => {
      console.log("Submit");
   };
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
            <form autoComplete="off" onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
               <Grid container spacing={2}>
                  {/* Text fields */}
                  {textInfoUser.map((props: any, i: number) => {
                     return (
                        <Grid key={i} item sm={6} xs={12}>
                           <TextField {...props} />
                        </Grid>
                     );
                  })}
                  {/* Checkbox fields */}
                  {radioFields.map((item: any, i: number) => {
                     return (
                        <Grid key={i} item md={6} xs={12}>
                           <FormControl>
                              <FormLabel>{item.label}</FormLabel>
                              <RadioGroup name={item.name}>
                                 {item.radioes.map((checkbox: any, i: number) => (
                                    <FormControlLabel
                                       key={i}
                                       value={checkbox.value}
                                       control={<Radio />}
                                       label={checkbox.label}
                                    />
                                 ))}
                              </RadioGroup>
                           </FormControl>
                        </Grid>
                     );
                  })}

                  {/* Time fields */}
                  <Grid item md={6} xs={12}>
                     <DateTimePicker />
                  </Grid>
               </Grid>

               <Button type="submit" size="large" variant="contained" sx={{ marginTop: 2 }}>
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
