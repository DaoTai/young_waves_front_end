import { Container, Grid, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Alert, Header } from "../../../components";
import { alert$ } from "../../../redux-saga/redux/selectors";
import { AlertProps } from "../../../utils/interfaces/Props";
import { TYPE_FEATURES } from "../../../utils/types";
import Features from "../Features";
import Statistical from "../Statistical";
import Trashes from "../Trashes";
import Users from "../Users";
const ContainerAdmin = () => {
   const theme = useTheme();
   const { isLoading, payload } = useSelector(alert$);
   const { title, mode, message } = payload as AlertProps;
   const [feature, setFeature] = useState<TYPE_FEATURES>("users");

   // Go to trashes
   const goToTrashes = useCallback(() => {
      setFeature("trashes");
   }, []);
   const Feature: Record<TYPE_FEATURES, React.ReactNode> = {
      statistical: <Statistical />,
      users: <Users goToTrashes={goToTrashes} />,
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
         <Header />
         <Grid container minHeight="100vh" mt={7}>
            <Grid item lg={2} md={2} sm={2} xs={12} sx={{ background: theme.myColor.bgGradient }}>
               <Features onClick={onClick} />
            </Grid>
            <Grid item lg={10} md={10} sm={10} xs={12}>
               <Container maxWidth="lg" sx={{ pb: 2, pt: 2 }}>
                  {Feature[feature]}
               </Container>
            </Grid>
         </Grid>
         {isLoading && <Alert title={title} mode={mode} message={message} />}
      </>
   );
};

export default ContainerAdmin;
