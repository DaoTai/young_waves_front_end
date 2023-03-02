import { Box, Container, useTheme } from "@mui/material";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ChatProvider } from "../../Contexts/Providers";
import { ChatContext } from "../../Contexts";
import { Alert, Header, ChatBox } from "../../components";
import { alert$ } from "../../redux-saga/redux/selectors";
import { AlertProps } from "../../utils/interfaces/Props";
const Home = () => {
   const theme = useTheme();
   const chatContext = useContext(ChatContext);
   const { isShow, payload } = useSelector(alert$);
   const { title, mode, message } = payload as AlertProps;
   return (
      <>
         <Helmet>
            <title>Young Waves</title>
         </Helmet>
         <Box bgcolor={theme.myColor.bg} minHeight="100vh">
            <Header />
            <Container sx={{ marginTop: 7, padding: "24px 0" }}>
               <Outlet />
            </Container>
            {isShow && <Alert title={title} mode={mode} message={message} />}
         </Box>
      </>
   );
};

export default Home;
