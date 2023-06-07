import { Box, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChangeModeButton } from "../../../components";
import Form from "./Form";
const SignUp = () => {
   return (
      <div id="sign-up">
         <Helmet>
            <title>Sign up</title>
         </Helmet>

         {/* Body */}
         <Box pl={2} pr={2} pb={2}>
            <Stack flexDirection="row" alignItems="center">
               <Typography variant="gradient" component="h1" fontSize={42} flex={2} textAlign="center">
                  Sign up
               </Typography>
               <Box justifySelf="flex-end">
                  <ChangeModeButton />
               </Box>
            </Stack>
            <Form />
            {/* Suggest */}
            <Box mt={1} textAlign="center">
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
