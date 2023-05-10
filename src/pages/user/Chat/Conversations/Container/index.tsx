import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import { memo, useEffect, useRef, useState, useContext } from "react";
import { useSelector } from "react-redux";
import * as api from "../../../../../apis/conversation";
import { BaseInput } from "../../../../../components";
import { useDebounce } from "../../../../../hooks";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { FormatConversation } from "../../../../../utils/interfaces/Chat";
import { ChatContext } from "../../../../../Contexts";
import { ClearButton, ConvItem } from "./styles";
const Container = ({
   onClickItem,
}: {
   onClickItem: (conversation: FormatConversation) => void;
}) => {
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
                  {conversations?.map((conversation, index) => (
                     <ConvItem key={index} onClick={() => onClickItem(conversation)}>
                        <Avatar src={conversation?.friend?.avatar} sx={{ width: 60, height: 60 }} />
                        <Stack>
                           <Typography variant="body1">{conversation?.friend?.fullName}</Typography>
                           {conversation.lastestMessage && (
                              <Typography
                                 variant="subtitle2"
                                 fontWeight={400}
                                 sx={{ color: theme.myColor.textSecondary }}>
                                 {user._id === conversation?.lastestMessage?.sender
                                    ? "You"
                                    : conversation.friend.fullName}
                                 {": "}
                                 {conversation?.lastestMessage?.content}
                              </Typography>
                           )}
                        </Stack>
                     </ConvItem>
                  ))}
               </Stack>
            )}
         </Box>

         {/* Button load more */}
         {currentPageRef.current < maxPageRef.current && (
            <Chip label="Get more" onClick={handleNextPage} sx={{ width: "100%" }} />
         )}
      </Box>
   );
};

export default memo(Container);
