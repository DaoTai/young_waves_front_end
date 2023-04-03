import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, CardActions, Checkbox, Chip, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likePost, unLikePost } from "../../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { Post } from "../../../../../utils/interfaces/Post";
const Actions = ({ post }: { post: Post }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload?.user?._id;
   const [like, setLike] = useState<boolean>(post?.likes.includes(idAuth));

   // Navigate to profile
   const handleNavigate = () => {
      if (window.location.pathname.includes("/user/profile")) {
         navigate(`/user/news/${post._id}`);
      } else {
         navigate(`/news/${post._id}`);
      }
   };

   // Like post
   const clickLike = () => {
      if (like) {
         dispatch(unLikePost({ idLike: idAuth, idPost: post._id }));
      } else {
         dispatch(likePost(post._id));
      }
      setLike(!like);
   };

   return (
      <>
         {/* Actions */}
         <CardActions sx={{ alignItems: "stretch", p: 0 }}>
            {/* Likes */}
            <Stack flexDirection="column">
               <Chip
                  variant="outlined"
                  label={
                     post.likes?.length > 1
                        ? post.likes?.length + " likes"
                        : post.likes?.length + " like"
                  }
               />
               <Checkbox
                  sx={{ zoom: 1.2 }}
                  icon={<FavoriteBorderIcon />}
                  checked={like}
                  onChange={() => setLike(!like)}
                  onClick={clickLike}
                  checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
               />
            </Stack>
            {/* Show detail */}
            <Stack
               flexDirection="column"
               justifyContent="space-between"
               alignItems="center"
               onClick={handleNavigate}>
               <Chip
                  variant="outlined"
                  label={
                     post.comments?.length > 1
                        ? post.comments?.length + " comments"
                        : post.comments?.length + " comment"
                  }
               />
               <Box flex={2}>
                  <CommentIcon
                     sx={{ cursor: "pointer", height: "100%", color: theme.myColor.textSecondary }}
                  />
               </Box>
            </Stack>
         </CardActions>

         {/* Show comments */}
      </>
   );
};

export default Actions;
