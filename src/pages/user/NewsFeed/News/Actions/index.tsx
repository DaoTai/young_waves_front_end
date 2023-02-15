import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardActions, Checkbox, Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLike } from "../../../../../redux-saga/redux/actions";
import { signInState$ } from "../../../../../redux-saga/redux/selectors";
import { Like } from "../../../../../utils/interfaces/Like";
import { Comment } from "../../../../../utils/interfaces/Post";
import { MyIconButton } from "./styles";
const Actions = ({
   likes = [],
   comments,
   id,
}: {
   likes: Like[];
   comments: Comment[];
   id: string;
}) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {
      isLoading,
      payload: { data },
   } = useSelector(signInState$);
   const idUser = data?.payload._id;
   const [like, setLike] = useState<boolean>(false);
   // const [totalLike, setTotalLike] = useState(likes.length);
   useEffect(() => {
      const authors = likes.map((like) => like.author);
      if (authors.includes(idUser)) {
         setLike(true);
      }
   }, []);
   const handleNavigate = () => {
      if (window.location.pathname.includes("/user/profile")) {
         navigate(`/user/news/${id}`);
      } else {
         navigate(`/news/${id}`);
      }
   };
   const handleLike = () => {
      setLike(!like);

      dispatch(createLike(id));
   };
   return (
      <>
         {/* Actions */}
         <CardActions sx={{ pl: 0, gap: 12 }}>
            {/* Likes */}
            {/* <Stack flexDirection="column" justifyContent="space-between">
               <Chip
                  variant="outlined"
                  label={`${totalLike} likes`}
               />
               <Checkbox
                  sx={{ padding: "14px" }}
                  icon={<FavoriteBorderIcon />}
                  checked={like}
                  onChange={() => setLike(!like)}
                  onClick={handleLike}
                  checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
               />
            </Stack> */}
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
