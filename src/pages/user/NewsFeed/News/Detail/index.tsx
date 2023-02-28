import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fab, Grid, Modal, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CloseButton, Comment as MyComment, PostBody, Spinner } from "../../../../../components";
import { editComment } from "../../../../../apis/comment";
import { getPost, deleteComment, showAlert } from "../../../../../redux-saga/redux/actions";
import { postState$ } from "../../../../../redux-saga/redux/selectors";
import { Comment } from "../../../../../utils/interfaces/Comment";
import { Post } from "../../../../../utils/interfaces/Post";
import { Profile } from "../../../../../utils/interfaces/Profile";
import Heading from "../Heading";
import CommentField from "./CommentField";
import { settings } from "./config";
import { ButtonSlide, MyBox, Container } from "./styles";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const Detail = () => {
   const theme = useTheme();
   const { isLoading, payload } = useSelector(postState$);
   const { id, indexImage } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { post, comments } = (payload as { post: Post; comments: Comment[] }) ?? {};
   const [open, setOpen] = useState(true);
   const sliderRef = useRef<Slider | null>(null);
   useEffect(() => {
      id && dispatch(getPost(id as string));
      if (indexImage) {
         const timerId = setTimeout(() => {
            sliderRef.current?.slickGoTo(Number(indexImage), false);
         }, 0);
         return () => {
            clearTimeout(timerId);
         };
      }
   }, [indexImage, id]);

   const handleClose = () => {
      setOpen(false);
      navigate(-1);
   };

   const handleDeleteComment = useCallback(async (idComment: string) => {
      dispatch(deleteComment({ idComment, idPost: post._id }));
   }, []);

   const handleEditComment = useCallback(async (idComment: string, updatedComment: string) => {
      const payload = {
         idComment,
         idPost: post._id,
         updatedComment: updatedComment.trim(),
      };
      const res = await editComment(payload);
      if (res.status === 200) {
         dispatch(
            showAlert({
               title: "Success",
               mode: "success",
               message: res.data.msg,
            })
         );
      } else {
         dispatch(
            showAlert({
               title: "Failed",
               mode: "warning",
               message: "Update comment failed",
            })
         );
      }
   }, []);

   return (
      <>
         <Modal open={open} onClose={handleClose}>
            <MyBox>
               <Typography
                  variant="h3"
                  textAlign="center"
                  p={2}
                  borderBottom={1}
                  sx={{ backgroundColor: theme.myColor.white }}>
                  Post of {post?.author?.fullName}
               </Typography>
               <CloseButton onClick={handleClose} size="large" />
               <Container container>
                  {/* Images */}
                  {post?.attachments?.length ? (
                     <Grid item md={8} xs={12} position="relative" height="100%" overflow="hidden">
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
                        {post?.attachments?.length > 1 && (
                           <ButtonSlide>
                              <Fab
                                 sx={{
                                    color: theme.myColor.textSecondary,
                                    backgroundColor: theme.myColor.white,
                                 }}
                                 size="medium"
                                 onClick={() => sliderRef.current?.slickPrev()}>
                                 <ArrowBackIosIcon />
                              </Fab>
                              <Fab
                                 sx={{
                                    color: theme.myColor.textSecondary,
                                    backgroundColor: theme.myColor.white,
                                 }}
                                 size="medium"
                                 onClick={() => sliderRef.current?.slickNext()}>
                                 <ArrowForwardIosIcon />
                              </Fab>
                           </ButtonSlide>
                        )}
                     </Grid>
                  ) : null}

                  {/* Content */}
                  <Grid
                     item
                     md={post?.attachments?.length > 0 ? 4 : 12}
                     xs={12}
                     pl={2}
                     pr={2}
                     boxShadow={1}
                     sx={{
                        maxHeight: "80vh",
                        background: theme.myColor.white,
                        overflowY: "scroll",
                     }}>
                     <Heading
                        author={post?.author as Profile}
                        news={post}
                        createdAt={post?.createdAt as string}
                     />
                     <PostBody bt={1} backgroundColor={theme.myColor.white}>
                        {post?.body}
                     </PostBody>

                     {/* Action comments */}
                     <CommentField />
                     {/* List comments */}
                     <Box>
                        {comments?.map((comment: Comment, index) => {
                           return (
                              <MyComment
                                 key={index}
                                 comment={comment}
                                 handleEdit={handleEditComment}
                                 handleDelete={handleDeleteComment}
                              />
                           );
                        })}
                     </Box>
                  </Grid>
               </Container>
            </MyBox>
         </Modal>
         <Spinner show={isLoading} />
      </>
   );
};

export default Detail;
