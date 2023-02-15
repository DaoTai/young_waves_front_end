import { Stack, useTheme, styled } from "@mui/material";
import { forwardRef } from "react";
import Images from "../../assets/images";

const Image = ({ src, srcSet, borderGd, circle = false, ...props }, ref) => {
   const theme = useTheme();

   const MyImg = styled("img")((theme) => ({
      borderRadius: "50%",
      objectFit: "cover",
   }));

   const borderGradient = {
      borderRadius: "50%",
      border: "2px solid transparent",
      background: `#fff padding-box ${theme.myColor.bgGradient} border-box`,
   };

   return (
      <Stack alignItems="center" justifyContent="center">
         {circle ? (
            <MyImg ref={ref} src={src || Images.anonymous} {...props} />
         ) : (
            <img ref={ref} src={src || Images.anonymous} {...props} />
         )}
      </Stack>
   );
};

export default forwardRef(Image);
