import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, CardActions, Checkbox, Chip, Paper, Popper, Stack, useTheme } from "@mui/material";
import { useEffect, useState, MouseEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likePost, showAlert, unLikePost } from "../../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { Post } from "../../../../../utils/interfaces/Post";
import { getLikesPost } from "../../../../../apis/post";
import { Profile } from "../../../../../utils/interfaces/Profile";
import ListLikes from "./ListLikes";
const Actions = ({ post }: { post: Post }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload?.user?._id;
   const [like, setLike] = useState<boolean>(post?.likes.includes(idAuth));
   const [openLikes, setOpenLikes] = useState<boolean>(false);
   const [totalLike, setTotalLike] = useState<number>(post?.likes.length ?? 0);
   const [userLikes, setUserLikes] = useState<Partial<Profile>[]>([]);

   // Navigate to profile
   const handleNavigate = () => {
      if (window.location.pathname.includes("/user/profile")) {
         navigate(`/user/news/${post._id}`);
      } else {
         navigate(`/news/${post._id}`);
      }
   };

   // Like post
   const handleLikePost = () => {
      if (like) {
         dispatch(unLikePost({ idLike: idAuth, idPost: post._id }));
         setTotalLike((prev) => prev - 1);
      } else {
         dispatch(likePost(post._id));
         setTotalLike((prev) => prev + 1);
      }
      setLike(!like);
   };

   const handleShowLikes = async (e: MouseEvent<HTMLElement>) => {
      if (totalLike === 0) {
         return;
      }
      setOpenLikes(true);
      try {
         const { data } = await getLikesPost({ id: post._id });
         setUserLikes(data);
      } catch (err) {
         dispatch(
            showAlert({
               title: "Like",
               mode: "error",
               message: "Get like failed!",
            })
         );
      }
   };

   // Close list likes
   const onCloseListLikes = useCallback(() => {
      setOpenLikes(false);
   }, []);

   return (
      <>
         {/* Actions */}
         <CardActions sx={{ alignItems: "stretch", p: 0 }}>
            {/* Likes */}
            <Stack flexDirection="column">
               <Chip
                  clickable
                  variant="outlined"
                  label={totalLike > 1 ? totalLike + " likes" : totalLike + " like"}
                  onClick={handleShowLikes}
               />
               <Checkbox
                  sx={{ zoom: 1.2 }}
                  icon={<FavoriteBorderIcon />}
                  checked={like}
                  onChange={() => setLike(!like)}
                  onClick={handleLikePost}
                  checkedIcon={<FavoriteIcon sx={{ color: theme.palette.primary.main }} />}
               />
            </Stack>

            {/* Poper user likes */}
            <ListLikes open={openLikes} users={userLikes} onClose={onCloseListLikes} />

            {/* Show detail */}
            <Stack flexDirection="column" justifyContent="space-between" alignItems="center" onClick={handleNavigate}>
               <Chip
                  variant="outlined"
                  label={
                     post.comments?.length > 1 ? post.comments?.length + " comments" : post.comments?.length + " comment"
                  }
               />
               <Box flex={2}>
                  <CommentIcon sx={{ cursor: "pointer", height: "100%", color: theme.palette.secondary.main }} />
               </Box>
            </Stack>
         </CardActions>

         {/* Show comments */}
      </>
   );
};

export default Actions;
