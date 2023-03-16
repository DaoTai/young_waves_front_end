import { Box, Container, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Alert, Header } from "../../components";
import { HEIGHT_HEADER } from "../../utils/constants";
import { alert$ } from "../../redux-saga/redux/selectors";
import { AlertProps } from "../../utils/interfaces/Props";
const Home = () => {
   const theme = useTheme();
   const { isShow, payload } = useSelector(alert$);
   const { title, mode, message } = payload as AlertProps;
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
                  pt: 1,
               }}>
               <Outlet />
            </Container>
            {isShow && <Alert title={title} mode={mode} message={message} />}
         </Box>
      </>
   );
};

export default Home;
