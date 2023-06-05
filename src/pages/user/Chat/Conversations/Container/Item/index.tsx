import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { authState$ } from "../../../../../../redux-saga/redux/selectors";
import { FormatConversation } from "../../../../../../utils/interfaces/Chat";
import { ConvItem, StyledBadge } from "../styles";
interface Props {
   onClickItem: () => void;
   conversation: FormatConversation;
   isOnline: boolean;
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
         <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant={isOnline ? "dot" : "standard"}>
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
                     textOverflow="ellipsis"
                     overflow="hidden"
                     maxWidth="190px"
                     sx={{ color: theme.palette.secondary.main }}>
                     {idAuth === conversation?.lastestMessage?.sender ? "You" : conversation.friend.fullName}
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
