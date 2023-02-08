import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import { Box, Fab, Grid, Modal, TextField, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CloseButton, Comment as MyComment, Image, Spinner } from "../../../../../components";
import { getPost } from "../../../../../redux-saga/redux/actions";
import { postState$ } from "../../../../../redux-saga/redux/selectors";
import { Comment, Post } from "../../../../../utils/interfaces/Post";
import { Profile } from "../../../../../utils/interfaces/Profile";
import Heading from "../Heading";
import { settings } from "./config";
import { ButtonSlide, MyBox } from "./styles";

const Detail = () => {
   const [newComment, setNewComment] = useState<string>("");
   const {
      isLoading,
      payload: { data },
   } = useSelector(postState$);
   const { id, indexImage } = useParams();
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { post, comments } = (data as { post: Post; comments: Comment[] }) ?? {};
   const [open, setOpen] = useState(true);
   const sliderRef = useRef<Slider | null>(null);

   useEffect(() => {
      id && dispatch(getPost(id as string));
      const timerId = setTimeout(() => {
         sliderRef.current?.slickGoTo(Number(indexImage));
      }, 0);
      return () => {
         clearTimeout(timerId);
      };
   }, [indexImage]);

   const handleClose = () => {
      setOpen(false);
      navigate("/");
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNewComment(e.target.value);
   };

   const handleSubmit = (e: React.KeyboardEvent): void => {
      if (e.keyCode === 13) {
         console.log("Submit");
      }
   };

   return (
      <>
         <Modal open={open} onClose={handleClose}>
            <MyBox>
               <CloseButton onClick={handleClose} size="large" />

               <Grid mt={3} container>
                  {/* Images */}
                  {post?.attachments.length > 0 && (
                     <Grid item md={6} xs={12} position="relative" height="100%">
                        <Slider ref={sliderRef} {...settings}>
                           {post?.attachments.map((img, index) => (
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
                  )}

                  {/* Content */}
                  <Grid item md={post?.attachments.length > 0 ? 6 : 12} xs={12} pl={4}>
                     <Heading
                        author={post?.author as Profile}
                        idNews={post?._id}
                        createdAt={post?.createdAt as string}
                     />
                     <Box mb={1} pb={1} sx={{ borderBottom: "1px solid #333" }}>
                        <Typography variant="body1" color="text.secondary">
                           {post?.body}
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
                              src={post?.author?.avatar}
                              srcSet={post?.author?.avatar}
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
                     <Box>
                        {comments?.map((comment: Comment) => {
                           return <MyComment key={comment._id} comment={comment} />;
                        })}
                     </Box>
                  </Grid>
               </Grid>
            </MyBox>
         </Modal>
         <Spinner show={isLoading} />
      </>
   );
};

export default Detail;
