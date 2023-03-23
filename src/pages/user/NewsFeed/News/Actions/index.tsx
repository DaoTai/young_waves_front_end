import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardActions, Checkbox, Chip, Stack } from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLike } from "../../../../../redux-saga/redux/actions";
import { authState$, ownerPostsState$ } from "../../../../../redux-saga/redux/selectors";
import { Post } from "../../../../../utils/interfaces/Post";
import { MyIconButton } from "./styles";
const Actions = ({ news }: { news: Post }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {
      payload: { data },
   } = useSelector(authState$);
   const ownerPosts$ = useSelector(ownerPostsState$);
   const idUser = data?.user?._id;
   const [like, setLike] = useState<boolean>(news?.likes.includes(idUser));
   // Total likes
   const totalLikes = useMemo(() => {
      return news.likes?.length > 1 ? news.likes?.length + " likes" : news.likes?.length + " like";
   }, [news, ownerPosts$]);

   // Navigate to profile
   const handleNavigate = () => {
      if (window.location.pathname.includes("/user/profile")) {
         navigate(`/user/news/${news._id}`);
      } else {
         navigate(`/news/${news._id}`);
      }
   };

   // Like post
   const clickLike = () => {
      setLike(!like);
      dispatch(handleLike(news._id));
   };

   return (
      <>
         {/* Actions */}
         <CardActions sx={{ pl: 0, gap: 12 }}>
            {/* Likes */}
            <Stack flexDirection="column" justifyContent="space-between">
               {news.likes?.length > 0 && <Chip variant="outlined" label={totalLikes} />}
               <Checkbox
                  sx={{ padding: "14px", zoom: 1.2 }}
                  icon={<FavoriteBorderIcon />}
                  checked={like}
                  onChange={() => setLike(!like)}
                  onClick={clickLike}
                  checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
               />
            </Stack>
            {/* Comments */}
            <Stack flexDirection="column" justifyContent="space-between" onClick={handleNavigate}>
               {news.comments?.length > 0 && (
                  <Chip variant="outlined" label={`${news.comments?.length} comments`} />
               )}
               <MyIconButton>
                  <CommentIcon />
               </MyIconButton>
            </Stack>
         </CardActions>

         {/* Show comments */}
      </>
   );
};

export default memo(Actions);
