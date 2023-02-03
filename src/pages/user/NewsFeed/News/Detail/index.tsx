import { Box, Button, Fab, Grid, Modal, Typography } from "@mui/material";
import { memo, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CloseButton, Comment } from "../../../../../components/";
import Heading from "../Heading";
import { images, settings } from "./config";
import { ButtonSlide, MyBox } from "./styles";
const Detail = ({ indexImage }: { indexImage?: number }, ref) => {
   const [open, setOpen] = useState(false);
   const sliderRef = useRef<Slider | null>(null);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   useImperativeHandle(ref, () => ({
      handleOpen,
      handleClose,
   }));

   useEffect(() => {
      const timerId = setTimeout(() => {
         sliderRef.current?.slickGoTo(indexImage as number);
      }, 1);
      return () => {
         clearTimeout(timerId);
      };
   }, [indexImage]);

   return (
      <Modal open={open} onClose={handleClose}>
         <MyBox>
            <CloseButton onClick={handleClose} size="large" />

            <Grid mt={3} container>
               {/* Images */}
               <Grid item md={6} xs={12} position="relative" height="100%">
                  <Slider ref={sliderRef} {...settings}>
                     {images.map((img, index) => (
                        <div key={index}>
                           <img
                              src={img}
                              style={{
                                 height: "80vh",
                                 width: "100%",
                                 objectFit: "contain",
                              }}
                           />
                        </div>
                     ))}
                  </Slider>
                  <ButtonSlide>
                     <Fab
                        sx={{ color: "#d3d3d3", backgroundColor: "rgba(255,255,255,0.3)" }}
                        size="medium"
                        onClick={() => sliderRef.current?.slickPrev()}>
                        <ArrowBackIosIcon />
                     </Fab>
                     <Fab
                        sx={{ color: "#d3d3d3", backgroundColor: "rgba(255,255,255,0.3)" }}
                        size="medium"
                        onClick={() => sliderRef.current?.slickNext()}>
                        <ArrowForwardIosIcon />
                     </Fab>
                  </ButtonSlide>
               </Grid>

               {/* Content */}
               <Grid item md={6} xs={12} pl={4}>
                  <Heading />
                  <Box mb={1} pb={1} sx={{ borderBottom: "1px solid #333" }}>
                     <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                     </Typography>
                  </Box>
                  <Comment />
               </Grid>
            </Grid>
         </MyBox>
      </Modal>
   );
};

export default forwardRef(Detail);
