import { NavLink } from "react-router-dom";
import { styled } from "@mui/material";
const MyLink = styled(NavLink)(({ theme }) => ({
   display: "block",
   alignItems: "center",
   color: theme.palette.primary.main,
   padding: 4,
   position: "relative",
   transition: "all 0.2s linear",
   "&.active": {
      color: theme.palette.link.main,
      fontWeight: "bold",
      "&:after": {
         content: "''",
         position: "absolute",
         left: 0,
         bottom: 0,
         width: "100%",
         height: 2,
         backgroundColor: `${theme.palette.link.main}`,
         borderRadius: 4,
         transform: "scale(1)",
         transition: "all 0.2s linear",
      },
   },
   "&:hover": {
      color: theme.palette.link.main,
      "&:after": {
         transform: "scaleX(1)",
      },
   },
   "&:after": {
      content: "''",
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: 2,
      backgroundColor: `${theme.palette.link.main}`,
      borderRadius: 4,
      transform: "scale(0)",
      transition: "all 0.2s linear",
   },
}));
export default MyLink;
