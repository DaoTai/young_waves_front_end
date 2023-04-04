import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fab, Modal, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import * as api from "../../../../../apis";
import { CloseButton, Comment as MyComment } from "../../../../../components";
import {
   createComment,
   createCommentSuccess,
   deleteComment,
   showAlert,
} from "../../../../../redux-saga/redux/actions";
import { Comment } from "../../../../../utils/interfaces/Comment";
import { Post } from "../../../../../utils/interfaces/Post";
import { Profile } from "../../../../../utils/interfaces/Profile";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import Heading from "../Heading";
import CommentField from "./CommentField";
import Actions from "../Actions";
import { settings } from "./config";
import { ButtonSlide, MyBox } from "./styles";

interface DetailPost {
   comments: [] | Comment[];
   post: Post;
}

const Detail = () => {
   const theme = useTheme();
   const { id, indexImage } = useParams();
   const auth$ = useSelector(authState$);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [detailPost, setDetailPost] = useState<DetailPost | null>(null);
   const sliderRef = useRef<Slider | null>(null);
   useLayoutEffect(() => {
      if (id) {
         try {
            (async () => {
               const res = await api.post.getDetailPost(id);
               const detailPost: DetailPost = res.data;
               setDetailPost(detailPost);
            })();
         } catch (err: any) {
            throw new Error(err);
         }
      }
      if (indexImage) {
         const timerId = setTimeout(() => {
            sliderRef.current?.slickGoTo(Number(indexImage), false);
         }, 0);
         return () => {
            clearTimeout(timerId);
         };
      }
   }, [indexImage, id]);

   // Close modal
   const handleClose = () => {
      navigate(-1);
   };

   // Create comment
   const handleCreateComment = async (comment: string) => {
      try {
         const res = await api.comment.createComment({
            idPost: detailPost?.post._id as string,
            comment: comment,
         });
         const newComment = res?.data as Comment;
         dispatch(
            createCommentSuccess({
               idPost: detailPost?.post._id as string,
               comment: newComment._id,
            })
         );
         setDetailPost((prev) => {
            return {
               ...prev,
               comments: [newComment, ...(prev?.comments as Comment[])],
            } as DetailPost;
         });
      } catch (err: any) {
         throw new Error(err);
      }
   };

   // Edit comment
   const handleEditComment = async (idComment: string, updatedComment: string) => {
      try {
         const res = await api.comment.editComment(
            detailPost?.post._id as string,
            idComment,
            updatedComment
         );
      } catch (err: any) {
         throw new Error(err);
      }
   };

   // Delete comment
   const handleDeleteComment = async (idComment: string) => {
      try {
         dispatch(deleteComment({ idPost: detailPost?.post._id as string, idComment }));
         setDetailPost((prev) => {
            const newComments = prev?.comments.filter((comment) => comment._id !== idComment);
            return { ...prev, comments: newComments } as DetailPost;
         });
      } catch (err: any) {
         throw new Error(err);
      }
   };

   return (
      <>
         <Modal open onClose={handleClose}>
            <MyBox sx={{ overflowY: "overlay" }}>
               <Box
                  bgcolor={theme.myColor.white}
                  boxShadow={1}
                  position="sticky"
                  sx={{ top: 0, right: 0, left: 0, zIndex: 999, height: 70 }}
                  p={2}>
                  <CloseButton onClick={handleClose} size="large" />
                  <Typography
                     variant="h4"
                     textAlign="center"
                     sx={{ color: theme.myColor.text }}
                     fontWeight={600}>
                     Post of {detailPost?.post?.author.fullName}
                  </Typography>
               </Box>
               {/* Body */}
               <Box>
                  {/* Images */}
                  {detailPost?.post.attachments.length ? (
                     <Box position="relative" height="100%" bgcolor="#000" overflow="hidden">
                        <Slider ref={sliderRef} {...settings}>
                           {detailPost?.post.attachments.map((img, index) => (
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
                        {detailPost?.post.attachments?.length > 1 && (
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
                     </Box>
                  ) : null}

                  {/* Content */}
                  <Stack
                     flexDirection="column"
                     p={2}
                     pt={0}
                     gap={2}
                     sx={{
                        background: theme.myColor.white,
                        border: "none",
                     }}>
                     <Box>
                        <Heading post={detailPost?.post as Post} />
                        <Typography
                           variant="body1"
                           textAlign="justify"
                           borderBottom={1}
                           lineHeight={2}>
                           {detailPost?.post?.body}
                        </Typography>
                     </Box>
                     {/* Field comment */}
                     <CommentField onSubmit={handleCreateComment} />
                     {/* List comment */}
                     <Box sx={{ scrollY: "auto" }}>
                        {detailPost?.comments?.map((comment: Comment, index) => {
                           return (
                              <MyComment
                                 key={comment._id}
                                 comment={comment}
                                 onSubmit={handleEditComment}
                                 handleDelete={handleDeleteComment}
                              />
                           );
                        })}
                     </Box>
                  </Stack>
               </Box>
            </MyBox>
         </Modal>
         {/* <Spinner show={isLoading} /> */}
      </>
   );
};

export default Detail;
