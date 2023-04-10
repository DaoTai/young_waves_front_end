import { Box, Container, Grid, Stack, useTheme } from "@mui/material";
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
   const { isShow, payload } = useSelector(alert$);
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
         <Container maxWidth="xl" sx={{ pb: 2, pt: 4, mt: 7, bgcolor: theme.myColor.white }}>
            <Stack flexDirection="row" gap={4} minHeight="100vh">
               <Features onClick={onClick} />
               <Box flex={2} pb={1} pt={1}>
                  {Feature[feature]}
               </Box>
            </Stack>
         </Container>
         {isShow && <Alert title={title} mode={mode} message={message} />}
      </>
   );
};

export default ContainerAdmin;
