import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Button, CardHeader, IconButton, Popover, Stack } from "@mui/material";
const Heading = () => {
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
               <Avatar
                  srcSet="https://images.immediate.co.uk/production/volatile/sites/3/2017/11/peaky-tommy-5d3c20b.jpg?quality=90&resize=620,414"
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/user/profile")}
               />
            }
            action={
               <IconButton onClick={handleClick}>
                  <MoreVertIcon />
               </IconButton>
            }
            title={<Link to="user/profile">Đào Tài</Link>}
            subheader="September 14, 2016"
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
