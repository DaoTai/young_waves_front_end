import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";
const Home = () => {
   return (
      <div>
         <Helmet>
            <title>Young Waves</title>
         </Helmet>
         <Header />
         <Container maxWidth="md" sx={{ marginTop: 8, padding: "24px 0" }}>
            <Outlet />
         </Container>
      </div>
   );
};

export default Home;
