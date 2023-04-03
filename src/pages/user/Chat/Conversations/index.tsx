import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as api from "../../../../apis";
import { BaseInput } from "../../../../components";
import { ChatContext } from "../../../../Contexts";
import { useDebounce } from "../../../../hooks";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Conversation, FormatConversation } from "../../../../utils/interfaces/Chat";

const Conversations = ({ onClose }: { onClose: () => void }) => {
   const chatContext = useContext(ChatContext);
   const theme = useTheme();
   const {
      payload: { user },
   } = useSelector(authState$);

   const [conversations, setConversations] = useState<Partial<FormatConversation[]>>([]);
   const [searchValue, setSearchValue] = useState<string>("");
   // const [page, setPage] = useState<number>(currentPage);
   const debouncedValue = useDebounce(searchValue.trim(), 500);
   const handleClickChatItem = (conversation: FormatConversation) => {
      chatContext?.handleShowChatBox(conversation);
      onClose();
   };

   useEffect(() => {
      (async () => {
         try {
            const res = await api.conversation.getAllConversation();
            const filterData = res.data.map((conversation: Conversation) => {
               const friend = conversation.members.find((member) => member?._id !== user?._id);
               return {
                  friend: friend,
                  idConversation: conversation._id,
               };
            });

            res.data?.length > 0 && setConversations(filterData);
         } catch (err) {
            console.error(err);
         }
      })();
   }, []);

   return (
      <>
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
               endAdornment={<SearchIcon />}
               onChange={(e) => setSearchValue(e.target.value)}
               sx={{ bgcolor: theme.myColor.bgGray }}
            />

            {/* List chat */}
            <Box>
               {conversations?.map((conversation, index) => (
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
                     <Avatar src={conversation?.friend.avatar} sx={{ width: 60, height: 60 }} />
                     <List>
                        <ListItem>
                           <Typography variant="subtitle1">
                              {conversation?.friend.fullName}
                           </Typography>
                        </ListItem>
                     </List>
                  </Stack>
               ))}
            </Box>
         </Stack>
      </>
   );
};

export default Conversations;
