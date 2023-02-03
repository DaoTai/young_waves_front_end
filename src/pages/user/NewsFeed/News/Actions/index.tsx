import { useState, useRef } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import DetailsIcon from "@mui/icons-material/Details";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardActions, CardContent, Collapse, Checkbox, Stack, Chip } from "@mui/material";
import Comment from "../../../../../components/Comment";
import Detail from "../Detail";
import { MyIconButton } from "./styles";
import { DetailRef } from "../Detail/interface";
const Actions = () => {
   const [expanded, setExpanded] = useState<boolean>(false);
   const [like, setLike] = useState<boolean>(false);
   const detailRef = useRef<DetailRef>(null);
   const handleExpandComments = () => {
      setExpanded(!expanded);
   };
   return (
      <>
         {/* Actions */}
         <CardActions sx={{ justifyContent: "space-between" }}>
            {/* Likes */}
            <Stack flexDirection="column" alignItems="center" justifyContent="space-between">
               <Chip variant="outlined" onClick={() => console.log("heelo")} label="100 likes" />
               <Checkbox
                  sx={{ padding: "14px" }}
                  icon={<FavoriteBorderIcon />}
                  checked={like}
                  onChange={() => setLike(!like)}
                  checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
               />
            </Stack>
            {/* Comments */}
            <Stack flexDirection="column" alignItems="center" justifyContent="space-between">
               <Chip variant="outlined" onClick={() => console.log("heelo")} label="12k comments" />
               <MyIconButton onClick={handleExpandComments}>
                  <CommentIcon />
               </MyIconButton>
            </Stack>
            {/* Detail */}
            <Stack flexDirection="column" alignItems="center" justifyContent="space-between">
               <Chip label="Detail post" />
               <MyIconButton onClick={() => detailRef.current?.handleOpen()}>
                  <DetailsIcon />
               </MyIconButton>
            </Stack>
         </CardActions>

         <Detail ref={detailRef} />

         {/* Show comments */}
         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
               <Comment />
            </CardContent>
         </Collapse>
      </>
   );
};

export default Actions;
