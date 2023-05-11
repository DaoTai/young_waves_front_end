import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Button, Stack, Tooltip, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import dateformat from "dateformat";
import { authState$ } from "../../../../../../redux-saga/redux/selectors";
import { Message as IMessage } from "../../../../../../utils/interfaces/Chat";
import * as api from "../../../../../../apis/message";
import { Dialog, OverlayFullImage } from "../../../../../../components";
const Message = ({
   message,
   friendAvatar,
   onDelete,
}: {
   message: IMessage;
   friendAvatar: string;
   onDelete: (id: string) => void;
}) => {
   const auth$ = useSelector(authState$);
   const [fullImage, setFullImage] = useState<string | null>(null);
   const [openFullImage, setOpenFullImage] = useState<boolean>(false);
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const idAuth = auth$.payload?.user?._id;

   const handleShowFullImg = (url: string) => {
      setOpenFullImage(true);
      setFullImage(url);
   };

   return (
      <>
         <Stack
            position="relative"
            className="wrap-message"
            justifyContent={idAuth === message.sender ? "flex-end" : "flex-start"}>
            {/* Avatar friend */}
            {idAuth !== message.sender && <Avatar src={friendAvatar} className="avatar" />}

            <Tooltip
               arrow
               title={dateformat(message.createdAt, "h:MM TT, dd mmmm yyyy ")}
               placement={idAuth === message.sender ? "bottom" : "right"}>
               <Stack className="wrap-content" flexDirection="column">
                  {/* Content message */}
                  <Typography
                     variant="body1"
                     component={message.content.slice(0, 4) === "http" ? "a" : "p"}
                     href={message.content}
                     target="_blank"
                     className={idAuth === message.sender ? "message" : "message message--friend"}>
                     {message.content}
                  </Typography>

                  {/* Attachments */}
                  {message!.attachments!.length > 0 && (
                     <Stack gap={1} mt={1}>
                        {message?.attachments?.map((attachment) => (
                           <img
                              key={attachment._id}
                              src={attachment.url}
                              alt="attachment"
                              onClick={() => handleShowFullImg(attachment.url)}
                           />
                        ))}
                     </Stack>
                  )}

                  {message.sender === idAuth && (
                     <MoreVertIcon className="more-icon" onClick={() => setOpenDialog(true)} />
                  )}
               </Stack>
            </Tooltip>
         </Stack>
         {openFullImage && fullImage && (
            <OverlayFullImage
               open={openFullImage}
               src={fullImage}
               onClose={() => setOpenFullImage(false)}
            />
         )}
         <Dialog
            open={openDialog}
            title="Message"
            content="You want to this message? You will can't restore them"
            onSubmit={() => onDelete(message._id)}
            onClose={() => setOpenDialog(false)}
         />
      </>
   );
};

export default memo(Message);
