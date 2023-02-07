import { Box, Button, Fab, Grid, Modal, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { memo, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CloseButton, Comment as MyComment, Image } from "../../../../../components";
import Heading from "../Heading";
import { getPost } from "../../../../../redux-saga/redux/actions";
import { postState$ } from "../../../../../redux-saga/redux/selectors";
import { images, settings } from "./config";
import { ButtonSlide, MyBox } from "./styles";
import { Post, Comment } from "../../../../../utils/interfaces/Post";
import { Profile } from "../../../../../utils/interfaces/Profile";

const Detail = ({ indexImage }: { indexImage?: number }) => {
   const [newComment, setNewComment] = useState<string>("");
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNewComment(e.target.value);
   };

   const handleSubmit = (e: React.KeyboardEvent): void => {
      if (e.keyCode === 13) {
         console.log("Submit");
      }
   };
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(postState$);
   const { data } = payload as { data: Post };
   const [open, setOpen] = useState(true);
   const sliderRef = useRef<Slider | null>(null);
   const handleClose = () => {
      setOpen(false);
      navigate("/");
   };
   useEffect(() => {
      id && dispatch(getPost(id as string));
      const timerId = setTimeout(() => {
         sliderRef.current?.slickGoTo(indexImage as number);
      }, 0);
      return () => {
         clearTimeout(timerId);
      };
   }, [indexImage]);

   return (
      <>
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
                     <Heading
                        author={data?.author as Profile}
                        _id={data?._id}
                        createdAt={data?.createdAt as string}
                     />
                     <Box mb={1} pb={1} sx={{ borderBottom: "1px solid #333" }}>
                        <Typography variant="body1" color="text.secondary">
                           {data?.body}
                        </Typography>
                     </Box>
                     {/* Action comments */}
                     <Grid
                        container
                        mb={2}
                        mt={2}
                        gap={1}
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="nowrap">
                        <Grid item xs={1} md={1}>
                           <Image
                              src={data?.author.avatar}
                              srcSet={data?.author.avatar}
                              alt="avatar"
                              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
                           />
                        </Grid>
                        <Grid item xs={11} md={11}>
                           <TextField
                              fullWidth
                              multiline
                              variant="standard"
                              placeholder="Write your comment"
                              value={newComment}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                              onKeyDown={handleSubmit}
                           />
                        </Grid>
                        {newComment && (
                           <Box sx={{ cursor: "pointer" }}>
                              <SendIcon />
                           </Box>
                        )}
                     </Grid>
                     {/* List comments */}
                     {data?.comments.map((comment: Comment) => {
                        return <MyComment key={comment._id} comment={comment} />;
                     })}
                  </Grid>
               </Grid>
            </MyBox>
         </Modal>
      </>
   );
};

export default Detail;
