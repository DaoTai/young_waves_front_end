import React, { useEffect, useRef } from "react";
import { ConvItem, StyledBadge } from "../styles";
import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import { authState$ } from "../../../../../../redux-saga/redux/selectors";
import { FormatConversation } from "../../../../../../utils/interfaces/Chat";
import { URL_SERVER } from "../../../../../../utils/constants";
interface Props {
   onClickItem: () => void;
   conversation: FormatConversation;
   lastestTime: {
      time: number;
      unit: string;
   };
}
const Item = ({ onClickItem, conversation, lastestTime }: Props) => {
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload.user._id;
   const socketRef = useRef<Socket>();
   // useEffect(() => {
   //    socketRef.current = io(URL_SERVER);
   //    socketRef.current.emit("addUser", idAuth, conversation.idConversation);
   //    socketRef.current.on("getOnlineUsers", (data) => {
   //       console.log("data: ", data);
   //    });
   //    return () => {
   //       socketRef.current?.disconnect();
   //    };
   // }, []);

   return (
      <ConvItem onClick={onClickItem}>
         <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot">
            <Avatar src={conversation?.friend?.avatar} sx={{ width: 60, height: 60 }} />
         </StyledBadge>
         <Stack overflow="hidden">
            <Typography variant="body1">{conversation?.friend?.fullName}</Typography>
            {/* Lastest message */}
            {conversation.lastestMessage && (
               <Stack textOverflow="ellipsis" flexDirection="row" gap={1}>
                  <Typography
                     variant="subtitle2"
                     fontWeight={400}
                     whiteSpace="nowrap"
                     overflow="hidden"
                     maxWidth="250px"
                     sx={{ color: theme.myColor.textSecondary }}>
                     {idAuth === conversation?.lastestMessage?.sender
                        ? "You"
                        : conversation.friend.fullName}
                     {": "}
                     {conversation?.lastestMessage?.text}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={500}>
                     {lastestTime && lastestTime.time + lastestTime.unit}
                  </Typography>
               </Stack>
            )}
         </Stack>
      </ConvItem>
   );
};

export default Item;
