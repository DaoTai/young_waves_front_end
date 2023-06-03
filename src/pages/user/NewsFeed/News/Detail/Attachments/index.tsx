import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, useTheme, Fab } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import Slider from "react-slick";
import { settings } from "./config";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ButtonSlide } from "../styles";
const Attachments = ({ attachments }: { attachments: string[] }) => {
   const theme = useTheme();
   const sliderRef = useRef<Slider | null>(null);
   useEffect(() => {
      const handleControlImages = (ev: any): void => {
         switch (ev.key) {
            case "ArrowLeft":
               sliderRef.current?.slickPrev();
               break;
            case "ArrowRight":
               sliderRef.current?.slickNext();
               break;
         }
      };
      window.addEventListener("keydown", handleControlImages);
      return () => {
         window.removeEventListener("keydown", handleControlImages);
      };
   }, []);
   return (
      <Box position="relative" height="100%" bgcolor={theme.palette.black.main} overflow="hidden">
         <Slider ref={sliderRef} {...settings}>
            {attachments.map((img, index) => (
               <div key={index}>
                  <img
                     src={img}
                     style={{
                        height: "60vh",
                        width: "100%",
                        objectFit: "contain",
                     }}
                  />
               </div>
            ))}
         </Slider>
         {attachments?.length > 1 && (
            <ButtonSlide>
               <Fab
                  sx={{
                     color: theme.palette.secondary.main,
                     backgroundColor: theme.palette.white.main,
                  }}
                  size="medium"
                  onClick={() => sliderRef.current?.slickPrev()}>
                  <ArrowBackIosIcon />
               </Fab>
               <Fab
                  sx={{
                     color: theme.palette.secondary.main,
                     backgroundColor: theme.palette.white.main,
                  }}
                  size="medium"
                  onClick={() => sliderRef.current?.slickNext()}>
                  <ArrowForwardIosIcon />
               </Fab>
            </ButtonSlide>
         )}
      </Box>
   );
};

export default memo(Attachments);
