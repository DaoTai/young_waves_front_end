import { Stack, useTheme } from "@mui/material";
import { forwardRef } from "react";
import Images from "../../assets/images";

const Image = ({ src, srcSet, borderGd, ...props }, ref) => {
   const theme = useTheme();
   const style = {
      width: "100%",
      height: "100%",
   };

   const borderGradient = {
      borderRadius: "50%",
      border: "2px solid transparent",
      background: `#fff padding-box ${theme.myColor.bgGradient} border-box`,
   };

   return (
      <Stack alignItems="center" justifyContent="center" sx={style}>
         <img ref={ref} src={src || Images.anonymous} {...props}  />
      </Stack>
   );
};

export default forwardRef(Image);
