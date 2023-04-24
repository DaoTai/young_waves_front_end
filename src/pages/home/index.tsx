import { Box, Container, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Alert, Header } from "../../components";
import { HEIGHT_HEADER } from "../../utils/constants";
import { alertState$ } from "../../redux-saga/redux/selectors";
import { AlertProps } from "../../utils/interfaces/Props";
import Navigation from "../../components/Header/Navigation";
const Home = () => {
   const theme = useTheme();
   const alert$ = useSelector(alertState$);
   return (
      <>
         <Helmet>
            <title>Young Waves</title>
         </Helmet>
         <Box bgcolor={theme.myColor.bg} minHeight="100vh">
            <Header />

            <Container
               sx={{
                  position: "relative",
                  top: HEIGHT_HEADER,
                  pb: 2,
                  pt: 2,
               }}>
               <Outlet />
            </Container>
            {alert$?.isShow && (
               <Alert
                  title={alert$?.payload.title}
                  mode={alert$?.payload.mode}
                  message={alert$?.payload.message}
               />
            )}
         </Box>
      </>
   );
};

export default Home;
