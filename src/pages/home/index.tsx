import { Box, Container, useTheme } from "@mui/material";
import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { alert$ } from "../../redux-saga/redux/selectors";
import { showAlert, hideAlert } from "../../redux-saga/redux/actions";
import { Header, Alert } from "../../components";
import { AlertProps } from "../../utils/interfaces/Props";
const Home = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { isShow, payload } = useSelector(alert$);
   const { title, mode, message } = payload as AlertProps;
   useEffect(() => {
      return () => {
         dispatch(hideAlert());
      };
   }, []);
   return (
      <Box bgcolor={theme.myColor.bg} minHeight="100vh">
         <Helmet>
            <title>Young Waves</title>
         </Helmet>
         <Header />
         <Container sx={{ marginTop: 7, padding: "24px 0" }}>
            <Outlet />
         </Container>
         {isShow && <Alert title={title} mode={mode} message={message} />}
      </Box>
   );
};

export default Home;
