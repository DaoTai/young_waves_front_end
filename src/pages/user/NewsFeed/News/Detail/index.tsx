import { Box, Modal, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import * as api from "../../../../../apis";
import { CloseButton, Comment as MyComment } from "../../../../../components";
import { createCommentSuccess, deleteComment } from "../../../../../redux-saga/redux/actions";
import { Comment } from "../../../../../utils/interfaces/Comment";
import { DetailPost, Post } from "../../../../../utils/interfaces/Post";
import Heading from "../Heading";
import Attachments from "./Attachments";
import CommentField from "./CommentField";
import { ContentWrapper, MyBox } from "./styles";

const Detail = () => {
   const theme = useTheme();
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [detailPost, setDetailPost] = useState<DetailPost | null>(null);
   const [page, setPage] = useState<number>(1);
   const [hasMore, setHasMore] = useState<boolean>(true);

   const fetchMoreData = async () => {
      if (detailPost?.comments.maxPage && page < detailPost.comments.maxPage) {
         setPage(page + 1);
         const res = await api.post.getDetailPost({ id: id as string, page: page + 1 });
         const detailPost: DetailPost = await res.data;
         setDetailPost((prev: any) => {
            return {
               ...prev,
               comments: {
                  ...detailPost.comments,
                  data: [...prev.comments.data, ...detailPost.comments.data],
               },
            };
         });
      } else {
         setHasMore(false);
      }
   };
   useEffect(() => {
      if (id) {
         try {
            (async () => {
               const res = await api.post.getDetailPost({ id });
               const detailPost: DetailPost = await res.data;
               setDetailPost(detailPost);
            })();
         } catch (err: any) {
            throw new Error(err);
         }
      }
   }, [id]);

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
               comments: {
                  ...prev?.comments,
                  data: [newComment, ...(prev?.comments.data as Comment[])],
               },
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
            const newComments = prev?.comments.data.filter((comment) => comment._id !== idComment);
            return {
               ...prev,
               comments: {
                  ...prev?.comments,
                  data: newComments,
               },
            } as DetailPost;
         });
      } catch (err: any) {
         throw new Error(err);
      }
   };

   return (
      <>
         {detailPost && (
            <Modal open onClose={handleClose}>
               <MyBox sx={{ overflowY: "overlay" }}>
                  {/* Title */}
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

                  {/* Main */}
                  <Box>
                     {/* Images */}
                     {detailPost?.post?.attachments.length ? (
                        <Attachments attachments={detailPost.post.attachments} />
                     ) : null}
                     {/* Content */}
                     <ContentWrapper>
                        {/* Heading and Body */}
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
                        {detailPost?.comments.data.length === 0 ? null : (
                           <InfiniteScroll
                              height={300}
                              dataLength={detailPost?.comments.data.length}
                              hasMore={hasMore}
                              loader={
                                 <Typography variant="body2" textAlign="center">
                                    Loading ...
                                 </Typography>
                              }
                              next={fetchMoreData}>
                              {detailPost?.comments?.data.map((comment: Comment) => (
                                 <MyComment
                                    key={comment._id}
                                    comment={comment}
                                    onSubmit={handleEditComment}
                                    handleDelete={handleDeleteComment}
                                    enableActions
                                 />
                              ))}
                           </InfiniteScroll>
                        )}
                     </ContentWrapper>
                  </Box>
               </MyBox>
            </Modal>
         )}
      </>
   );
};

export default Detail;
