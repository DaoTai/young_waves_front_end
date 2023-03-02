import SearchIcon from "@mui/icons-material/Search";
import { Box, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { useState, useContext } from "react";
import { BaseInput, Image } from "../../../../components";
import { ChatContext } from "../../../../Contexts";
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

const ListChat = ({ onClose }: { onClose: () => void }) => {
   const chatContext = useContext(ChatContext);
   const theme = useTheme();
   const handleClickChatItem = () => {
      chatContext?.handleShowChatBox();
      onClose();
   };
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
               endAdornment={<SearchIcon />}
               sx={{ bgcolor: theme.myColor.bgGray }}
            />

            {/* List chat */}
            <Box>
               {chats.map((chat, index) => (
                  <Stack
                     key={index}
                     flexDirection="row"
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
                     <Image src={chat.avatar} circle />
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

export default ListChat;
