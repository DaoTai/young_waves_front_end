import { NavLink } from "react-router-dom";
import { styled } from "@mui/material";
const MyLink = styled(NavLink)({
   display: "inline-flex",
   alignItems: "center",
   color: "pink",
   position: "relative",
   transition: "all 0.2s linear",
   "&.active": {
      color: "hotpink",
   },
   "&:hover": {
      color: "pink",
      "&:after": {
         transform: "scaleX(1)",
      },
   },
   "&:after": {
      content: "''",
      position: "absolute",
      bottom: -2,
      width: "100%",
      height: 3,
      backgroundColor: "#9e9e9e",
      borderRadius: 4,
      transform: "scale(0)",
      transformOrigin: "left",
      transition: "all 0.2s linear",
   },
});
export default MyLink;
