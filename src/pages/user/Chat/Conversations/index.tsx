import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import {
   Avatar,
   Box,
   Fab,
   List,
   ListItem,
   Pagination,
   Paper,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usersState$ } from "../../../../redux-saga/redux/selectors";
import { getAllUser } from "../../../../redux-saga/redux/actions";
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
   const dispatch = useDispatch();
   const {
      payload: { currentPage, maxPage, users },
   } = useSelector(usersState$);
   const [listChat, setListChat] = useState<Array<Profile>>(users);
   const [searchValue, setSearchValue] = useState<string>("");
   const [page, setPage] = useState<number>(currentPage);
   const debouncedValue = useDebounce(searchValue.trim(), 500);
   const handleClickChatItem = () => {
      chatContext?.handleShowChatBox();
      onClose();
   };

   const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
      setPage(page);
      dispatch(getAllUser({ page }));
   };
   useEffect(() => {
      if (debouncedValue) {
         setListChat(() =>
            users.filter((chat) => chat.fullName?.toLowerCase().includes(debouncedValue))
         );
      } else {
         setListChat(users);
      }
   }, [debouncedValue]);

   useEffect(() => {
      setListChat(users);
   }, [users]);

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
                        <ListItem>{/* <Typography>{chat.lastText}</Typography> */}</ListItem>
                     </List>
                  </Stack>
               ))}
            </Box>
            <Pagination
               page={page}
               count={maxPage}
               shape="rounded"
               size="large"
               sx={{ margin: "0 auto" }}
               onChange={(event: ChangeEvent<unknown>, page: number) =>
                  handleChangePage(event, page)
               }
            />
         </Stack>
      </>
   );
};

export default Conversations;
