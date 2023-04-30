import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Box, Fab, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as api from "../../../../apis";
import { BaseInput } from "../../../../components";
import { ChatContext } from "../../../../Contexts";
import { useDebounce } from "../../../../hooks";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Conversation, FormatConversation } from "../../../../utils/interfaces/Chat";

interface ResponseConversation {
   conversations: Conversation[];
   currentPage: number;
   maxPage: number;
}

const Conversations = ({ onClose }: { onClose: () => void }) => {
   const chatContext = useContext(ChatContext);
   const theme = useTheme();
   const {
      payload: { user },
   } = useSelector(authState$);

   const [conversations, setConversations] = useState<Partial<FormatConversation[]>>([]);
   const [searchValue, setSearchValue] = useState<string>("");
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [maxPage, setMaxPage] = useState<number>(1);
   const debouncedValue = useDebounce(searchValue.trim(), 500);

   useEffect(() => {
      (async () => {
         try {
            const response = await fetchApi({ friendName: debouncedValue });
            setConversations(response.conversations);
            // Set page
            setCurrentPage(response.currentPage);
            setMaxPage(response.maxPage);
         } catch (err) {
            console.error(err);
         }
      })();
   }, [debouncedValue]);

   const handleClickChatItem = (conversation: FormatConversation) => {
      chatContext?.handleShowChatBox(conversation);
      onClose();
   };

   const fetchApi = async (q: { friendName?: string; page?: number }) => {
      try {
         const res = await api.conversation.getAllConversation(q);
         const data = res.data as ResponseConversation;
         // Conversations
         const formatData = data.conversations?.map((conv) => {
            const friend = conv.members.find((member) => member?._id !== user?._id);
            return {
               friend: friend,
               idConversation: conv._id,
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

   const handleNextPage = async () => {
      if (currentPage + 1 <= maxPage) {
         try {
            const response = await fetchApi({ page: currentPage + 1 });
            setConversations((prev) => [...prev, ...response.conversations]);
            setCurrentPage(response.currentPage);
            setMaxPage(response.maxPage);
         } catch (err) {
            console.error(err);
         }
      }
   };

   return (
      <Stack p={2} pb={0} gap={2} minWidth="360px" maxHeight="70vh" overflow="scroll">
         {/* Heading */}
         <Typography variant="h5" fontWeight={700}>
            Chat
         </Typography>
         {/* Search box */}
         <BaseInput
            placeholder="Looking up your chat"
            fullWidth
            value={searchValue}
            endAdornment={
               searchValue && (
                  <Fab
                     size="small"
                     sx={{
                        p: 2,
                        bgcolor: "transparent",
                        boxShadow: "none",
                        transition: "all 0.3s linear",
                        "&:hover": { opacity: 0.6, bgcolor: theme.myColor.bg },
                     }}
                     onClick={() => setSearchValue("")}>
                     <CloseIcon />
                  </Fab>
               )
            }
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ bgcolor: theme.myColor.bgGray }}
         />

         {/* List chat */}
         <Box>
            {conversations.length === 0 ? (
               <Typography variant="body1" component="h6" textAlign="center">
                  No conversation
               </Typography>
            ) : (
               conversations?.map((conversation, index) => (
                  <Stack
                     key={index}
                     flexDirection="row"
                     alignItems="center"
                     boxShadow={2}
                     p={2}
                     mb={1}
                     borderRadius={2}
                     onClick={() => handleClickChatItem(conversation as FormatConversation)}
                     sx={{
                        cursor: "pointer",
                        "&:hover": {
                           backgroundColor: theme.myColor.bgGray,
                        },
                     }}>
                     <Avatar src={conversation?.friend?.avatar} sx={{ width: 60, height: 60 }} />
                     <List>
                        <ListItem>
                           <Typography variant="subtitle1">
                              {conversation?.friend?.fullName}
                           </Typography>
                        </ListItem>
                     </List>
                  </Stack>
               ))
            )}
         </Box>
         {/* Button load more */}
         {currentPage + 1 <= maxPage && (
            <Typography
               variant="body1"
               component="span"
               textAlign="center"
               sx={{
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                  bgcolor: theme.myColor.bgGray,
                  padding: "4px",
                  transition: "all 0.3s linear",
                  "&:hover": {
                     opacity: 0.5,
                  },
               }}
               onClick={handleNextPage}>
               Load more
            </Typography>
         )}
      </Stack>
   );
};

export default Conversations;
