import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { authState$ } from "../../../../../../redux-saga/redux/selectors";
import { FormatConversation } from "../../../../../../utils/interfaces/Chat";
import { ConvItem, StyledBadge } from "../styles";
interface Props {
   isOnline: boolean;
   onClickItem: () => void;
   conversation: FormatConversation;
   lastestTime: {
      time: number;
      unit: string;
   };
}
const Item = ({ onClickItem, conversation, lastestTime, isOnline }: Props) => {
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload.user._id;

   return (
      <ConvItem onClick={onClickItem}>
         <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={isOnline ? "dot" : "standard"}>
            <Avatar src={conversation?.friend?.avatar} sx={{ width: 60, height: 60 }} />
         </StyledBadge>
         <Stack flex={2} overflow="hidden">
            <Typography variant="subtitle1" fontWeight={500}>
               {conversation?.friend?.fullName}
            </Typography>
            {/* Lastest message */}
            {conversation.lastestMessage && (
               <Stack alignItems="center" flexDirection="row" gap={1}>
                  <Stack
                     flexDirection="row"
                     flexWrap="nowrap"
                     alignItems="center"
                     width={200}
                     sx={{ color: theme.palette.secondary.main }}>
                     <Typography variant="subtitle2">
                        {idAuth === conversation?.lastestMessage?.sender ? "You" : conversation.friend.fullName}
                     </Typography>
                     <Typography
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        variant="subtitle2"
                        fontWeight={300}
                        flex={2}>
                        {": "}
                        {conversation?.lastestMessage?.text}
                     </Typography>
                  </Stack>
                  <Typography
                     variant="subtitle2"
                     fontWeight={500}
                     pr={1}
                     pl={1}
                     borderRadius={99}
                     bgcolor={theme.palette.gray.main}>
                     {lastestTime && lastestTime.time + lastestTime.unit}
                  </Typography>
               </Stack>
            )}
         </Stack>
      </ConvItem>
   );
};

export default Item;
