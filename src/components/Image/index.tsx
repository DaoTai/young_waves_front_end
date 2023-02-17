import { Stack, useTheme, styled } from "@mui/material";
import { forwardRef } from "react";
import Images from "../../assets/images";

const Image = (
   { src, srcSet, borderGd, circle = false, width = "52px", height = "52px", ...props },
   ref
) => {
   const theme = useTheme();

   const MyImg = styled("img")((theme) => ({
      borderRadius: "50%",
      objectFit: "cover",
      width: width,
      height: height,
   }));

   const borderGradient = {
      borderRadius: "50%",
      border: "2px solid transparent",
      background: `#fff padding-box ${theme.myColor.bgGradient} border-box`,
   };

   return (
      <Stack alignItems="center" justifyContent="center">
         {circle ? (
            <MyImg ref={ref} src={src || Images.anonymous} sx={{ ...props }} />
         ) : (
            <img
               ref={ref}
               src={src || Images.anonymous}
               width={width}
               height={height}
               style={{ ...props }}
            />
         )}
      </Stack>
   );
};

export default forwardRef(Image);
