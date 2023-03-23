import SearchIcon from "@mui/icons-material/Search";
import {
   Avatar,
   Box,
   List,
   ListItem,
   Pagination,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { BaseInput } from "../../../../components";
import { ChatContext } from "../../../../Contexts";
import { useDebounce } from "../../../../hooks";
import { Profile } from "../../../../utils/interfaces/Profile";
import * as api from "../../../../apis";

interface Conversation {
   members: Partial<Profile[]>;
   _id: string;
}

interface FormatConversation {
   friend: Profile;
   idConversation: string;
}

const Conversations = ({ onClose }: { onClose: () => void }) => {
   const chatContext = useContext(ChatContext);
   const theme = useTheme();

   const [conversations, setConversations] = useState<Partial<FormatConversation[]>>([]);
   const [searchValue, setSearchValue] = useState<string>("");
   // const [page, setPage] = useState<number>(currentPage);
   const debouncedValue = useDebounce(searchValue.trim(), 500);
   const handleClickChatItem = (idConservation: string) => {
      chatContext?.handleShowChatBox(idConservation);
      onClose();
   };

   const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
      // setPage(page);
   };
   // useEffect(() => {
   //    if (debouncedValue) {
   //       setListChat(() =>
   //          users.filter((chat) => chat.fullName?.toLowerCase().includes(debouncedValue))
   //       );
   //    } else {
   //       setListChat(users);
   //    }
   // }, [debouncedValue]);

   useEffect(() => {
      (async () => {
         try {
            const res = await api.conversation.getAllConversation();
            const filterData = res.data.map((conversation: Conversation) => ({
               friend: conversation.members[1],
               idConversation: conversation._id,
            }));
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
                     onClick={() => handleClickChatItem(conversation?.idConversation as string)}
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
