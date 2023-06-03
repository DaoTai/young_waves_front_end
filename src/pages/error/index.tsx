import { Box, Button, Container, Stack, styled, Typography, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const Error = () => {
   const navigate = useNavigate();
   const theme = useTheme();
   const style = {
      position: "fixed",
      width: "100%",
      inset: "0 0 0 0",
      background: theme.palette.gradient.main,
   };
   return (
      <>
         <Helmet>
            <title>Page not found :(</title>
         </Helmet>
         <Stack sx={style} alignItems="center" justifyContent="center">
            <Typography
               variant="h1"
               color={theme.palette.white.main}
               textAlign="center"
               p={4}
               borderRadius={4}
               sx={{
                  textShadow: "4px 4px 4px rgba(0,0,0,0.6)",
                  textDecoration: "#6aba62 wavy underline",
                  textDecorationThickness: 6,
                  textUnderlineOffset: "20%",
               }}>
               404 Not found ...
            </Typography>
            <Button
               variant="contained"
               startIcon={<ArrowBackIcon />}
               sx={{
                  margin: 4,
                  padding: "8px 32px",
                  border: "2px dashed #ccc",
                  boxShadow: 4,
                  fontSize: "1.2rem",
                  letterSpacing: 2,
                  background: "rgba(0,0,0,0.02)",
                  textAlign: "center",
               }}
               onClick={() => navigate(-1)}>
               Back
            </Button>
         </Stack>
      </>
   );
};

export default Error;
