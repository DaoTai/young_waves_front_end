import { Box, Grid, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { alertState$ } from "../../../redux-saga/redux/selectors";
import { Alert, ChangeModeButton } from "../../../components";
import CoverPicture from "../../../assets/images/cover-picture.jpg";
const AuthLayout = () => {
   const alert$ = useSelector(alertState$);
   const MyGrid = styled(Grid)(({ theme }) => ({
      backgroundImage: `url(${CoverPicture})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      position: "fixed",
      inset: 0,
   }));
   const WrapForm = styled(Grid)(({ theme }) => ({
      backgroundColor: theme.palette.white.main,
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      maxHeight: "100%",
      overflow: "overlay",
      transition: "0.3s linear all",
      "& > #sign-in": {
         width: 450,
         maxWidth: "100%",
      },
      "& > #sign-up": {
         width: "60vw",
         maxWidth: "100%",
         maxHeight: "95vh",
      },
   }));
   return (
      <>
         <MyGrid container justifyContent="center" alignItems="center">
            <Box position="absolute" top={10} right={10}>
               <ChangeModeButton />
            </Box>
            <WrapForm
               item
               sx={(theme) => ({
                  [theme.breakpoints.down("md")]: {
                     "& > #sign-up": {
                        width: "100%",
                     },
                     "& > #sign-in": {
                        width: "95vw",
                     },
                  },

                  [theme.breakpoints.up("sm")]: {
                     borderRadius: 0,
                  },
                  [theme.breakpoints.up("md")]: {
                     borderRadius: 1,
                  },
               })}>
               <Outlet />
            </WrapForm>
         </MyGrid>
         {alert$.isShow && <Alert />}
      </>
   );
};

export default AuthLayout;
