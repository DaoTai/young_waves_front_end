import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
   Avatar,
   Box,
   useTheme,
   Stack,
   Tooltip,
   Typography,
   Menu,
   MenuItem,
   Button,
} from "@mui/material";
import dateformat from "dateformat";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, OverlayFullImage } from "../../../../../../components";
import { authState$ } from "../../../../../../redux-saga/redux/selectors";
import { Message as IMessage } from "../../../../../../utils/interfaces/Chat";
import { Helmet } from "react-helmet-async";

interface Props {
   message: IMessage;
   friendAvatar: string;
   onDelete: (id: string) => void;
}

const Message = ({ message, friendAvatar, onDelete }: Props) => {
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const idAuth = auth$.payload?.user?._id;

   const onCloseMenu = () => {
      setAnchorEl(null);
   };

   const showDeleteMsgDialog = () => {
      setOpenDialog(true);
      onCloseMenu();
   };

   const handleCopyMsg = () => {
      navigator.clipboard.writeText(message.text);
      onCloseMenu();
   };

   return (
      <>
         <Stack
            position="relative"
            className="wrap-message"
            justifyContent={idAuth === message.sender ? "flex-end" : "flex-start"}>
            {/* Avatar friend */}
            {idAuth !== message.sender && (
               <Tooltip
                  arrow
                  placement="bottom"
                  title={dateformat(message.createdAt, "h:MM TT, dd/mm/yyyy ")}>
                  <Avatar src={friendAvatar} className="avatar" sx={{ alignSelf: "flex-end" }} />
               </Tooltip>
            )}

            <Stack className="wrap-content" flexDirection="column">
               {/* Attachments */}
               {message?.attachments && message?.attachments.length > 0 && (
                  <Stack
                     gap={0.25}
                     mt={1}
                     flexDirection="row"
                     alignItems="stretch"
                     justifyContent="flex-end"
                     flexWrap="wrap">
                     {message?.attachments?.map((attachment) => (
                        <Box
                           key={attachment.url}
                           sx={{
                              img: {
                                 marginLeft: idAuth === message.sender ? "auto" : 0,
                                 marginRight: idAuth !== message.sender ? "auto" : 0,
                              },
                           }}>
                           <img
                              src={attachment.url}
                              srcSet={attachment.url + "2x"}
                              alt="attachment"
                           />
                        </Box>
                     ))}
                  </Stack>
               )}

               {/* Content message */}
               <Typography
                  variant="body1"
                  component={message?.text?.slice(0, 4) === "http" ? "a" : "p"}
                  href={message.text}
                  target="_blank"
                  className={idAuth === message.sender ? "message" : "message message--friend"}>
                  {message.text}
               </Typography>

               {message.sender === idAuth && (
                  <>
                     <Box
                        className="more-icon"
                        aria-controls={!!anchorEl ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={!!anchorEl ? "true" : undefined}
                        onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreVertIcon />
                     </Box>
                     <Menu
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        onClose={onCloseMenu}
                        anchorOrigin={{
                           vertical: "bottom",
                           horizontal: "right",
                        }}
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}>
                        <MenuItem onClick={handleCopyMsg}>Copy</MenuItem>
                        <MenuItem onClick={showDeleteMsgDialog}>Delete </MenuItem>
                     </Menu>
                  </>
               )}
            </Stack>
         </Stack>

         <Dialog
            open={openDialog}
            title="Message"
            content="Do you want to remove this message? You will can't restore them !"
            onSubmit={() => onDelete(message._id)}
            onClose={() => setOpenDialog(false)}
         />
      </>
   );
};

export default memo(Message);
