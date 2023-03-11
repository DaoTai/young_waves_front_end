import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BaseInput } from "../../../../components";
import { ChatContext } from "../../../../Contexts";
import { useDebounce } from "../../../../hooks";
import { Profile } from "../../../../utils/interfaces/Profile";
interface Chat extends Partial<Profile> {
   lastText: string;
}

const chats: Array<Chat> = [
   {
      avatar:
         "https://kenh14cdn.com/2020/8/18/photo-1-15686376816071988089298-15917799097502082068023-15977247591621782218097.jpg",
      fullName: "Dao Tai",
      lastText: "Hellu guys",
   },
   {
      avatar:
         "https://kenh14cdn.com/2020/8/18/photo-1-15686376816071988089298-15917799097502082068023-15977247591621782218097.jpg",
      fullName: "BrT",
      lastText: "Hellu guys",
   },

   {
      avatar:
         "https://kenh14cdn.com/2020/8/18/photo-1-15686376816071988089298-15917799097502082068023-15977247591621782218097.jpg",
      fullName: "SoutSide Rap",
      lastText: "Hellu guys",
   },
];

const Conversations = ({ onClose }: { onClose: () => void }) => {
   const chatContext = useContext(ChatContext);
   const theme = useTheme();
   const [listChat, setListChat] = useState<Array<Chat>>(chats);
   const [searchValue, setSearchValue] = useState<string>("");
   const debouncedValue = useDebounce(searchValue.trim(), 500);
   const handleClickChatItem = () => {
      chatContext?.handleShowChatBox();
      onClose();
   };
   useEffect(() => {
      if (debouncedValue) {
         setListChat(() =>
            chats.filter((chat) => chat.fullName?.toLowerCase().includes(debouncedValue))
         );
      } else {
         setListChat(chats);
      }
   }, [debouncedValue]);

   return (
      <>
         <Stack p={2} gap={2} minWidth="25vw" maxHeight="70vh" overflow="scroll">
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
               {listChat.map((chat, index) => (
                  <Stack
                     key={index}
                     flexDirection="row"
                     alignItems="center"
                     boxShadow={2}
                     pl={1}
                     mb={1}
                     borderRadius={4}
                     onClick={handleClickChatItem}
                     sx={{
                        cursor: "pointer",
                        "&:hover": {
                           backgroundColor: theme.myColor.bgGray,
                        },
                     }}>
                     <Avatar src={chat.avatar} sx={{ width: 50, height: 50 }} />
                     <List>
                        <ListItem>
                           <Typography variant="subtitle1">{chat.fullName}</Typography>
                        </ListItem>
                        <ListItem>
                           <Typography>{chat.lastText}</Typography>
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
