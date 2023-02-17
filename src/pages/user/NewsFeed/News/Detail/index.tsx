import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fab, Grid, Modal, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CloseButton, Comment as MyComment, Spinner, PostBody } from "../../../../../components";
import { getPost } from "../../../../../redux-saga/redux/actions";
import { postState$, ownerPostsState$ } from "../../../../../redux-saga/redux/selectors";
import { Comment } from "../../../../../utils/interfaces/Comment";
import { Post } from "../../../../../utils/interfaces/Post";
import { Profile } from "../../../../../utils/interfaces/Profile";
import Heading from "../Heading";
import CommentField from "./CommentField";
import { settings } from "./config";
import { ButtonSlide, MyBox } from "./styles";

const Detail = () => {
   const { isLoading, payload } = useSelector(postState$);
   const { id, indexImage } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { post, comments } = (payload as { post: Post; comments: Comment[] }) ?? {};
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
      navigate(-1);
   };

   return (
      <>
         <Modal open={open} onClose={handleClose}>
            <MyBox>
               <Typography variant="h3" textAlign="center">
                  Post of {post?.author?.fullName}
               </Typography>
               <CloseButton onClick={handleClose} size="large" />
               <Grid pt={3} borderTop={1} container>
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
                        news={post}
                        createdAt={post?.createdAt as string}
                     />
                     <PostBody bt={1}>{post?.body}</PostBody>

                     {/* Action comments */}
                     <CommentField post={post} />
                     {/* List comments */}
                     <Box>
                        {comments?.map((comment: Comment, index) => {
                           return <MyComment key={index} comment={comment} />;
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
