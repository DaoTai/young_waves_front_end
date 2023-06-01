import { Box, Typography, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Form from "./Form";
const SignUp = () => {
   const theme = useTheme();
   return (
      <div id="sign-up">
         <Helmet>
            <title>Sign up</title>
         </Helmet>

         {/* Body */}
         <Box pt={1} pl={4} pr={4} pb={2}>
            <Typography
               variant="h3"
               textAlign="center"
               sx={{
                  background: theme.myColor.bgGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  pb: 2,
               }}>
               Sign up
            </Typography>
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
