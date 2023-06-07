import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Logo from "/vite.svg";
const Error = () => {
   const navigate = useNavigate();
   const theme = useTheme();
   const style = {
      position: "fixed",
      width: "100%",
      inset: "0 0 0 0",
      background: theme.palette.background.paper,
   };
   return (
      <>
         <Helmet>
            <title>Page not found :(</title>
         </Helmet>
         <Stack sx={style} alignItems="center" justifyContent="center" gap={2}>
            <img src={Logo} style={{ zoom: 2 }} />
            <Typography variant="gradient" fontSize={52} textAlign="center" sx={{ letterSpacing: 12 }}>
               404 Not found ...
            </Typography>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
               Back
            </Button>
         </Stack>
      </>
   );
};

export default Error;
