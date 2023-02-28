import SearchIcon from "@mui/icons-material/Search";
import { Box, List, ListItem, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { Image, BaseInput } from "../../../../components";
const ListChat = () => {
   const theme = useTheme();
   return (
      <Stack p={2} gap={2} minWidth="25vw" maxHeight="60vh" overflow="scroll">
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
            <Stack
               flexDirection="row"
               boxShadow={2}
               pl={1}
               mb={1}
               borderRadius={4}
               sx={{
                  cursor: "pointer",
                  "&:hover": {
                     backgroundColor: theme.myColor.bgGray,
                  },
               }}>
               <Image
                  src="https://kenh14cdn.com/2020/8/18/photo-1-15686376816071988089298-15917799097502082068023-15977247591621782218097.jpg"
                  circle
               />
               <List>
                  <ListItem>
                     <Typography variant="subtitle1">Dao Tai</Typography>
                  </ListItem>
                  <ListItem>
                     <Typography>hello ae</Typography>
                  </ListItem>
               </List>
            </Stack>
            <Stack
               flexDirection="row"
               boxShadow={2}
               pl={1}
               mb={1}
               borderRadius={4}
               sx={{
                  cursor: "pointer",
                  "&:hover": {
                     backgroundColor: theme.myColor.bgGray,
                  },
               }}>
               <Image
                  src="https://kenh14cdn.com/2020/8/18/photo-1-15686376816071988089298-15917799097502082068023-15977247591621782218097.jpg"
                  circle
               />
               <List>
                  <ListItem>
                     <Typography variant="subtitle1">Dao Tai</Typography>
                  </ListItem>
                  <ListItem>
                     <Typography>hello ae</Typography>
                  </ListItem>
               </List>
            </Stack>
         </Box>
      </Stack>
   );
};

export default ListChat;
