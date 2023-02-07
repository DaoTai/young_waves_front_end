import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Button, CardHeader, IconButton, Popover, Stack } from "@mui/material";
import { Post } from "../../../../../utils/interfaces/Post";
import { Profile } from "../../../../../utils/interfaces/Profile";
import { Image } from "../../../../../components";
const Heading = ({
   author,
   createdAt = "",
   _id = "",
}: {
   author: Profile;
   createdAt: string;
   _id: string;
}) => {
   const navigate = useNavigate();
   const location = useLocation();
   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleCopyLinkPost = () => {
      navigator.clipboard.writeText(location.pathname);
   };

   const open = Boolean(anchorEl);
   return (
      <>
         <CardHeader
            avatar={
               <Link to={`/user/profile/${author?._id}`}>
                  <Image
                     src={author?.avatar}
                     srcSet={author?.avatar}
                     alt="avatar"
                     style={{ borderRadius: "50%", width: "40px", height: "40px" }}
                  />
               </Link>
            }
            action={
               <IconButton onClick={handleClick}>
                  <MoreVertIcon />
               </IconButton>
            }
            title={<Link to={`/user/profile/${author?._id}`}>{author?.fullName}</Link>}
            subheader={dateFormat(createdAt, "mmmm dS, yyyy, h:MM TT")}
         />
         <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}>
            <Stack sx={{ gap: 1 }}>
               <Button sx={{ textTransform: "none" }} endIcon={<BookmarkAddIcon />}>
                  Save
               </Button>
               <Button
                  sx={{ textTransform: "none" }}
                  endIcon={<ContentCopyIcon />}
                  onClick={handleCopyLinkPost}>
                  Copy link
               </Button>
            </Stack>
         </Popover>
      </>
   );
};

export default Heading;
