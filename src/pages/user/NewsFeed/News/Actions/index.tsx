import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardActions, Checkbox, Chip, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Comment } from "../../../../../utils/interfaces/Post";
import { MyIconButton } from "./styles";
const Actions = ({ likes, comments, id }: { likes: string[]; comments: Comment[]; id: string }) => {
   const navigate = useNavigate();
   const [like, setLike] = useState<boolean>(false);
   const handleNavigate = () => {
      if (window.location.pathname.includes("/user/profile")) {
         navigate(`/user/news/${id}`);
      } else {
         navigate(`/news/${id}`);
      }
   };
   return (
      <>
         {/* Actions */}
         <CardActions sx={{ pl: 0, gap: 12 }}>
            {/* Likes */}
            <Stack flexDirection="column" justifyContent="space-between">
               <Chip
                  variant="outlined"
                  onClick={() => console.log("heelo")}
                  label={`${likes?.length} likes`}
                  // label={likes.length > 0 ? `${likes.length} likes` : "You will be first like"}
               />
               <Checkbox
                  sx={{ padding: "14px" }}
                  icon={<FavoriteBorderIcon />}
                  checked={like}
                  onChange={() => setLike(!like)}
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
