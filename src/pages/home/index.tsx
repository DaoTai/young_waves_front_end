import { Container } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components";
import { NewsFeed } from "../user";
import { signInState$ } from "../../redux-saga/redux/selectors";
const Home = () => {
   const signInData = useSelector(signInState$);

   useEffect(() => {
      console.log("Home: ", signInData);
   }, [signInData]);
   return (
      <div>
         <Helmet>
            <title>Young Waves</title>
         </Helmet>
         <Header />
         {signInData.payload ? <div> OK</div> : <p>Aloo</p>}
         <Container maxWidth="md" sx={{ marginTop: 8, padding: "24px 0" }}>
            <Outlet />
         </Container>
      </div>
   );
};

export default Home;
