import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardActions, Checkbox, Chip, Stack } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLike } from "../../../../../redux-saga/redux/actions";
import { authState$, ownerPostsState$ } from "../../../../../redux-saga/redux/selectors";
import { Like } from "../../../../../utils/interfaces/Like";
import { Comment, Post } from "../../../../../utils/interfaces/Post";
import { MyIconButton } from "./styles";
const Actions = ({
   likes = [],
   comments,
   id,
}: {
   likes: Like[];
   comments: string[];
   id: string;
}) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {
      isLoading,
      payload: { data },
   } = useSelector(authState$);
   const ownerPosts$ = useSelector(ownerPostsState$);
   const idUser = data?.user?._id;
   const ownerPosts = ownerPosts$?.payload?.data;
   const [like, setLike] = useState<boolean>(false);

   const totalLikes = useMemo(() => {
      return likes?.length > 1 ? likes?.length + " likes" : likes?.length + " like";
   }, [likes, ownerPosts$]);
   useEffect(() => {
      const owner = ownerPosts.map((post: Post) => post.author._id);
      // Exist user in list like
      const authors = likes.map((like) => like.author);
      if (authors.includes(idUser) && owner.includes(idUser)) {
         setLike(true);
      }
   }, [ownerPosts, likes]);

   // Navigate to profile
   const handleNavigate = () => {
      if (window.location.pathname.includes("/user/profile")) {
         navigate(`/user/news/${id}`);
      } else {
         navigate(`/news/${id}`);
      }
   };

   // Like post
   const clickLike = () => {
      setLike(!like);
      dispatch(handleLike(id));
   };

   return (
      <>
         {/* Actions */}
         <CardActions sx={{ pl: 0, gap: 12 }}>
            {/* Likes */}
            <Stack flexDirection="column" justifyContent="space-between">
               <Chip variant="outlined" label={totalLikes} />
               <Checkbox
                  sx={{ padding: "14px" }}
                  icon={<FavoriteBorderIcon />}
                  checked={like}
                  onChange={() => setLike(!like)}
                  onClick={clickLike}
                  checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
               />
            </Stack>
            {/* Comments */}
            <Stack flexDirection="column" justifyContent="space-between" onClick={handleNavigate}>
               <Chip variant="outlined" label={`${comments?.length} comments`} />
               <MyIconButton>
                  <CommentIcon />
               </MyIconButton>
            </Stack>
         </CardActions>

         {/* Show comments */}
      </>
   );
};

export default Actions;
