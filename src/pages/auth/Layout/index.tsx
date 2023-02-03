import { Grid, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
   const MyGrid = styled(Grid)(({ theme }) => ({
      minHeight: "100vh",
      background: theme.myColor.bgGradient,
   }));
   const WrapForm = styled(Grid)({
      backgroundColor: "#fff",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      maxHeight: "90vh",
      overflow: "overlay",
      transition: "0.3s linear all",
      "& > #sign-in": {
         width: "40vw",
      },
      "& > #sign-up": {
         width: "70vw",
      },
   });
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
