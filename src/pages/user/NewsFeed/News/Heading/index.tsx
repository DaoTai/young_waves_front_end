import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
   Button,
   CardHeader,
   Chip,
   IconButton,
   Popover,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Image } from "../../../../../components";
import { Profile } from "../../../../../utils/interfaces/Profile";
const Heading = ({
   status,
   idNews = "",
   author,
   createdAt = "",
}: {
   status?: string;
   idNews: string;
   author: Profile;
   createdAt: string;
}) => {
   const theme = useTheme();
   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleCopyLinkPost = () => {
      navigator.clipboard.writeText(`${window.location.origin}/news/${idNews}`);
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
            subheader={
               <>
                  {status && (
                     <Typography pr={1} variant="body2" component="span">
                        I'm feeling {status?.toLocaleLowerCase()}
                     </Typography>
                  )}
                  <Chip label={dateFormat(createdAt, "mmmm dS, yyyy, h:MM TT")} />
               </>
            }
            sx={{ pl: 0 }}
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
               <Button
                  sx={{
                     justifyContent: "flex-start",
                     textTransform: "none",
                     bgcolor: "transparent",
                     color: theme.myColor.link,
                  }}
                  startIcon={<ModeEditIcon />}>
                  <Typography variant="body2">Edit</Typography>
               </Button>
               <Button
                  sx={{
                     justifyContent: "flex-start",
                     textTransform: "none",
                     bgcolor: "transparent",
                     color: theme.myColor.link,
                  }}
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyLinkPost}>
                  <Typography variant="body2">Copy link</Typography>
               </Button>
            </Stack>
         </Popover>
      </>
   );
};

export default Heading;
