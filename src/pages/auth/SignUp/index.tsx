import {
   Autocomplete,
   Box,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   TextField,
   Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Form from "./Form";
import { useEffect, useState } from "react";
const SignUp = () => {
   return (
      <div id="sign-up">
         <Helmet>
            <title>Sign up</title>
         </Helmet>

         {/* Body */}
         <Box p={2} pl={4} pr={4}>
            <Typography variant="h2" textAlign="center" color="primary">
               Sign up
            </Typography>
            <Form />
            {/* Suggest */}
            <Box mt={3} textAlign="center">
               <Typography variant="subtitle1" component="b" mr={1}>
                  Have you already had an account?
               </Typography>
               <Link to="/auth/sign-in">Sign in</Link>
            </Box>
         </Box>
      </div>
   );
};

export default SignUp;
