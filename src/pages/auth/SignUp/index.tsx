import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Form from "./Form";
const SignUp = () => {
   // useEffect(() => {
   //    fetch("https://restcountries.com/v3.1/all")
   //       .then((res) => res.json())
   //       .then((data) => {
   //          const newData = data.map((item) => {
   //             return {
   //                name: item.name.common,
   //                image: item.flags.png,
   //             };
   //          });
   //          setCountries(newData);
   //       })
   //       .catch((err) => console.error(err));
   // }, []);

   // if (payload?.status === 200) {
   //    return <Navigate to="/auth/sign-in" />;
   // }

   return (
      <div id="sign-up">
         <Helmet>
            <title>Sign up</title>
         </Helmet>

         {/* Body */}
         <Box p={4} paddingTop={1} paddingBottom={2}>
            <Typography variant="h3" textAlign="center" color="primary">
               Sign up
            </Typography>
            <Form />
            {/* Suggest */}
            <Box mt={3} textAlign="center">
               <Typography variant="subtitle1" component="b" mr={1}>
                  Have already an account?
               </Typography>
               <Link to="/auth/sign-in">Sign in</Link>
            </Box>
         </Box>
      </div>
   );
};

export default SignUp;
