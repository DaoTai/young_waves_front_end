import { Stack } from "@mui/material";
import { forwardRef } from "react";
import Images from "../../assets/images";
const Image = ({ src, srcSet, ...props }, ref) => {
   return (
      <Stack alignItems="center" justifyContent="center" sx={{ width: "100%", height: "100%" }}>
         <img ref={ref} src={src || Images.anonymous} {...props} />
      </Stack>
   );
};

export default forwardRef(Image);
