import { Box, Container, useTheme, Grid } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Alert, Header } from "../../../components";
import { alert$ } from "../../../redux-saga/redux/selectors";
import { AlertProps } from "../../../utils/interfaces/Props";
import { TYPE_FEATURES } from "../../../utils/types";
import Features from "../Features";
import Authorization from "../Authorization";
import Statistical from "../Statistical";
import Users from "../Users";
import Trashes from "../Trashes";
const ContainerAdmin = () => {
   const theme = useTheme();
   const { isShow, payload } = useSelector(alert$);
   const { title, mode, message } = payload as AlertProps;
   const [feature, setFeature] = useState<TYPE_FEATURES>("users");
   const Feature: Record<TYPE_FEATURES, React.ReactNode> = {
      authorization: <Authorization />,
      statistical: <Statistical />,
      users: <Users />,
      trashes: <Trashes />,
   };
   const onClick = (name: TYPE_FEATURES) => {
      setFeature(name);
   };
   return (
      <>
         <Helmet>
            <title>Young Waves | Admin</title>
         </Helmet>
         <Box>
            <Header />
            <Grid container pt={1} minHeight="100vh">
               <Grid
                  item
                  lg={2}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ background: theme.myColor.bgGradient }}>
                  <Features onClick={onClick} />
               </Grid>
               <Grid item lg={10} md={10} sm={10} xs={12}>
                  <Container maxWidth="lg" sx={{ paddingTop: 10, background: theme.myColor.bg }}>
                     {Feature[feature]}
                  </Container>
               </Grid>
            </Grid>
            {isShow && <Alert title={title} mode={mode} message={message} />}
         </Box>
      </>
   );
};

export default ContainerAdmin;
