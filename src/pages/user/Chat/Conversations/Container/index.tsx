import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import * as api from "../../../../../apis/conversation";
import { BaseInput } from "../../../../../components";
import { useDebounce } from "../../../../../hooks";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { FormatConversation } from "../../../../../utils/interfaces/Chat";
import { URL_SERVER } from "../../../../../utils/constants";
import { ClearButton, ConvItem, StyledBadge } from "./styles";
import Item from "./Item";

interface Props {
   onClickItem: (conversation: FormatConversation) => void;
}

const Container = ({ onClickItem }: Props) => {
   const theme = useTheme();
   const {
      payload: { user },
   } = useSelector(authState$);
   const currentPageRef = useRef<number>(1);
   const maxPageRef = useRef<number>(1);
   const [conversations, setConversations] = useState<FormatConversation[]>([]);
   const [searchValue, setSearchValue] = useState<string>("");
   const debouncedValue = useDebounce(searchValue);

   useEffect(() => {
      (async () => {
         try {
            const { currentPage, maxPage, conversations } = await fetchApi({
               friendName: debouncedValue,
            });
            setConversations(conversations);
            currentPageRef.current = currentPage;
            maxPageRef.current = maxPage;
            // Set page
         } catch (err) {
            console.error(err);
         }
      })();
   }, [debouncedValue]);

   // Get conversations
   const fetchApi = async (q: { friendName?: string; page?: number }) => {
      try {
         const { data } = await api.getAllConversation(q);
         // Conversations
         const formatData = data.conversations?.map((conv) => {
            const friend = conv.members.find((member) => member?._id !== user?._id);
            return {
               friend: friend,
               idConversation: conv._id,
               lastestMessage: conv.lastestMessage,
            };
         }) as FormatConversation[];
         return {
            conversations: formatData,
            currentPage: data.currentPage,
            maxPage: data.maxPage,
         };
      } catch (err: any) {
         throw new Error(err);
      }
   };

   // Get more conversations
   const handleNextPage = async () => {
      currentPageRef.current++;
      if (currentPageRef.current <= maxPageRef.current) {
         try {
            const response = await fetchApi({ page: currentPageRef.current });
            setConversations((prev) => [...prev, ...response.conversations]);
         } catch (err) {
            console.error(err);
         }
      }
   };
   return (
      <Box>
         {/* Search conversation */}
         <BaseInput
            placeholder="Looking up your chat"
            fullWidth
            value={searchValue}
            startAdornment={<SearchIcon />}
            endAdornment={
               searchValue && (
                  <ClearButton onClick={() => setSearchValue("")}>
                     <CloseIcon />
                  </ClearButton>
               )
            }
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ bgcolor: theme.myColor.bg, mb: 2, borderRadius: 1 }}
         />

         {/* List conversation */}
         <Box>
            {conversations.length === 0 ? (
               <Typography variant="body1" component="h6" textAlign="center">
                  No conversation
               </Typography>
            ) : (
               <Stack gap={2} mb={2}>
                  {conversations?.map((conversation) => {
                     const now = new Date();
                     const specificTime = new Date(String(conversation?.lastestMessage?.updatedAt));
                     const timeDiffMs = now.getTime() - specificTime.getTime();
                     const timeDiffMin = Math.floor(timeDiffMs / 1000 / 60);
                     let lastestTime = timeDiffMin;
                     // if (timeDiffMin >= 60) {
                     //    lastestTime /= 60;
                     // }
                     return (
                        <Item
                           key={conversation.idConversation}
                           conversation={conversation}
                           lastestTime={lastestTime}
                           onClickItem={() => onClickItem(conversation)}
                        />
                     );
                  })}
               </Stack>
            )}
         </Box>

         {/* Button load more */}
         {currentPageRef.current < maxPageRef.current && (
            <Chip label="Get more" onClick={handleNextPage} sx={{ width: "100%" }} />
         )}
         <Divider />
      </Box>
   );
};

export default memo(Container);
