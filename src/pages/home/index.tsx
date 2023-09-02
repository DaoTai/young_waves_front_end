import { Box, Container, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Alert, Header } from "../../components";
import { alertState$ } from "../../redux-saga/redux/selectors";
import { HEIGHT_HEADER } from "../../utils/constants";
const Home = () => {
  const theme = useTheme();
  const alert$ = useSelector(alertState$);
  return (
    <>
      <Helmet>
        <title>Young Waves</title>
      </Helmet>
      <Box bgcolor={theme.palette.background.default} minHeight="100vh">
        <Header />

        <Container
          sx={{
            position: "relative",
            top: HEIGHT_HEADER,
            pb: { sm: 2, xs: `${HEIGHT_HEADER}px` },
            pt: 2,
          }}
        >
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
