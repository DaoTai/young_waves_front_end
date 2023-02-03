import { Link } from "react-router-dom";
import { styled, Input, SwipeableDrawer } from "@mui/material";
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
         filter: "drop-shadow(1px 1px 1px red)",
         transition: "all 0.2s linear",
         "&:hover": {
            filter: "constrast(200%)",
            transform: "rotate(120deg)",
         },
      },
   };
});

export const Option = styled(Link)(({ theme }) => ({
   display: "inline-flex",
   alignItems: "center",
   gap: 4,
   padding: 8,
   boxShadow: "1px 1px 1px rgb(0 0 0 / 40%)",
   width: "100%",
   color: "pink",
   position: "relative",
   transition: "all 0.2s linear",
   "&:hover": {
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
      svg: {
         transform: "scale(1.2)",
      },
   },
   "&:last-child:hover": {
      svg: {
         transform: "translateX(2px)",
      },
   },
}));

export const ToggleOptions = styled(SwipeableDrawer)({
   ".MuiPaper-root": {
      justifyContent: "space-between",
      width: "20vw",
   },
});
