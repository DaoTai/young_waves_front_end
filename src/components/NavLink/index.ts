import { NavLink } from "react-router-dom";
import { styled } from "@mui/material";
const MyLink = styled(NavLink)(({ theme }) => ({
   display: "block",
   alignItems: "center",
   color: theme.palette.primary.light,
   padding: 4,
   position: "relative",
   transition: "all 0.2s linear",
   "&.active": {
      color: theme.myColor.link,
      fontWeight: "bold",
   },
   "&:hover": {
      color: theme.myColor.link,
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
      backgroundColor: `${theme.myColor.link}`,
      borderRadius: 4,
      transform: "scale(0)",
      transition: "all 0.2s linear",
   },
}));
export default MyLink;
