import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fab, Grid, Modal, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CloseButton, Comment as MyComment, Spinner } from "../../../../../components";
import { getPost } from "../../../../../redux-saga/redux/actions";
import { postState$ } from "../../../../../redux-saga/redux/selectors";
import { Comment, Post } from "../../../../../utils/interfaces/Post";
import { Profile } from "../../../../../utils/interfaces/Profile";
import Heading from "../Heading";
import CommentField from "./CommentField";
import { settings } from "./config";
import { ButtonSlide, MyBox } from "./styles";

const Detail = () => {
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

   return (
      <>
         <Modal open={open} onClose={handleClose}>
            <MyBox>
               <CloseButton onClick={handleClose} size="large" />

               <Grid mt={3} container>
                  {/* Images */}
                  {post?.attachments?.length ? (
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
                  ) : null}

                  {/* Content */}

                  <Grid item md={post?.attachments?.length > 0 ? 6 : 12} xs={12} pl={4}>
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
                     <CommentField post={post} />
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
