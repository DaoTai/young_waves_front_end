import { Link } from "react-router-dom";
import { styled, Fab, SwipeableDrawer, Button } from "@mui/material";
import NavLink from "../NavLink";
export const Logo = styled(Link)(({ theme }) => {
   return {
      "&:hover": {
         h5: {
            color: theme.palette.primary.main,
         },
         svg: {
            filter: "constrast(200%)",
            transform: "rotate(120deg)",
         },
      },
      svg: {
         filter: "drop-shadow(1px 1px 1px #333)",
         transition: "all 0.3s linear",
         "&:hover": {
            filter: "constrast(200%)",
            transform: "rotate(120deg)",
         },
      },
   };
});

export const Option = styled(NavLink)(({ theme }) => ({
   display: "inline-flex",
   alignItems: "center",
   gap: 4,
   padding: 12,
   boxShadow: "1px 1px 1px rgb(0 0 0 / 40%)",
   width: "100%",
   color: theme.myColor.text,
   transition: "all 0.2s linear",
   "&.active .MuiTypography-root": {
      color: theme.myColor.link,
   },
   "&:hover": {
      color: theme.myColor.white,
      backgroundColor: theme.palette.primary.main,
      ".MuiTypography-root": {
         color: theme.myColor.white,
      },
   },
}));

export const LogOutButton = styled(Button)(({ theme }) => ({
   p: 1,
   gap: 2,
   padding: 12,
   justifyContent: "flex-start",
   borderRadius: 0,
   transition: "all 0.2s linear",
   "&:hover": {
      color: theme.myColor.white,
      backgroundColor: theme.palette.primary.main,
      ".MuiTypography-root": {
         color: theme.myColor.white,
      },
   },
}));

export const ToggleOptions = styled(SwipeableDrawer)({
   ".MuiPaper-root": {
      justifyContent: "space-between",
   },
});
