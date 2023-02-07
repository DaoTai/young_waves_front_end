import CommentIcon from "@mui/icons-material/Comment";
import DetailsIcon from "@mui/icons-material/Details";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardActions, CardContent, Collapse, Checkbox, Stack, Chip } from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Detail from "../Detail";
import { MyIconButton } from "./styles";
import { DetailRef } from "../Detail/interface";
import { Comment } from "../../../../../utils/interfaces/Post";
const Actions = ({ likes, comments, id }: { likes: string[]; comments: Comment[]; id: string }) => {
   const navigate = useNavigate();
   const [like, setLike] = useState<boolean>(false);
   const detailRef = useRef<DetailRef>(null);
   return (
      <>
         {/* Actions */}
         <CardActions sx={{ gap: 12 }}>
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
            <Stack
               flexDirection="column"
               justifyContent="space-between"
               onClick={() => navigate(`/news/${id}`)}>
               <Chip
                  variant="outlined"
                  // onClick={() => detailRef.current?.handleOpen()}
                  label={`${comments?.length} comments`}
               />
               <MyIconButton
               //  onClick={() => detailRef.current?.handleOpen()}
               >
                  <CommentIcon />
               </MyIconButton>
            </Stack>
         </CardActions>

         {/* Show comments */}
      </>
   );
};

export default Actions;
