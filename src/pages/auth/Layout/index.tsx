import { Grid, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import CoverPicture from "../../../assets/images/cover-picture.jpg";
const AuthLayout = () => {
   const MyGrid = styled(Grid)(({ theme }) => ({
      backgroundImage: `url(${CoverPicture})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      position: "fixed",
      inset: 0,
   }));
   const WrapForm = styled(Grid)(({ theme }) => ({
      backgroundColor: theme.myColor.white,
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      maxHeight: "100%",
      overflow: "overlay",
      transition: "0.3s linear all",
      "& > #sign-in": {
         width: "35vw",
         maxWidth: "100%",
      },
      "& > #sign-up": {
         width: "60vw",
         maxWidth: "100%",
         maxHeight: "90vh",
      },
   }));
   return (
      <>
         <MyGrid container justifyContent="center" alignItems="center">
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
      </>
   );
};

export default AuthLayout;
