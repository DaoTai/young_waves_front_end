import { Avatar, Button, styled } from "@mui/material";
import { Link } from "react-router-dom";
export const Logo = styled(Link)(({ theme }) => {
   return {
      svg: {
         filter: "drop-shadow(1px 1px 1px #333)",
         transition: "all 0.3s linear",
      },
   };
});

export const MyAvtar = styled(Avatar)(({ theme }) => {
   return {
      width: 48,
      height: 48,
      boxShadow: theme.shadows[1],
      cursor: "pointer",
      transition: "0.3s linear all",
      "&:hover": {
         opacity: 0.8,
      },
   };
});

export const Option = styled(Button)(({ theme }) => ({
   display: "inline-flex",
   alignItems: "center",
   justifyContent: "flex-start",
   padding: "8px 12px",
   borderRadius: 0,
   color: theme.palette.primary.main,
   backgroundColor: theme.palette.white.main,
   transition: "all 0.2s linear",
   "& .MuiTypography-root": {
      paddingLeft: 8,
   },
   "&.active .MuiTypography-root": {
      color: theme.palette.link.main,
   },
   "& .MuiSvgIcon-root": {
      width: "1.3em",
      height: "1.3em",
      padding: 6,
      fontSize: 28,
      borderRadius: 99,
      transition: "inherit",
   },
   "&:hover": {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.primary.main,
      ".MuiTypography-root": {
         color: theme.palette.white.main,
      },
      ".MuiSvgIcon-root": {
         color: theme.palette.link.main,
         backgroundColor: theme.palette.white.main,
      },
   },
}));
