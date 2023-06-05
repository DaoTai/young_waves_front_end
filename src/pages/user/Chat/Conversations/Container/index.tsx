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
import { conversation } from "../../../../../apis";

interface Props {
   onClickItem: (conversation: FormatConversation) => void;
}

interface OnlineFriendsSocket {
   idUser: string;
   idSocket: string;
}

const Container = ({ onClickItem }: Props) => {
   const theme = useTheme();
   const {
      payload: { user },
   } = useSelector(authState$);
   const socketRef = useRef<Socket>();
   const currentPageRef = useRef<number>(1);
   const maxPageRef = useRef<number>(1);
   const [conversations, setConversations] = useState<FormatConversation[]>([]);
   const [onlineFriends, setOnlineFriends] = useState<string[]>([]);
   const [searchValue, setSearchValue] = useState<string>("");
   const debouncedValue = useDebounce(searchValue);

   useEffect(() => {
      const friends = conversations.map((conv) => conv.friend._id);
      socketRef.current = io(URL_SERVER);
      socketRef.current.emit("addOnlineUser", user._id, friends);
      socketRef.current.on("getOnlineFriends", (idOnlineFriends: string[]) => {
         setOnlineFriends(idOnlineFriends);
      });
      socketRef.current.on("removeOnlineUser", (offlineUserId: string) => {
         setOnlineFriends(onlineFriends.filter((friend) => friend !== offlineUserId));
      });
      return () => {
         socketRef.current?.disconnect();
      };
   }, [conversations]);

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
            sx={{
               color: theme.palette.text.primary,
               bgcolor: theme.palette.gray.main,
               mb: 2,
               borderRadius: 1,
            }}
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
                     const isOnline = onlineFriends.includes(conversation.friend._id as string);
                     const now = new Date();
                     const specificTime = new Date(String(conversation?.lastestMessage?.updatedAt));
                     const timeDiffMs = now.getTime() - specificTime.getTime();
                     const timeDiffMin = Math.floor(timeDiffMs / 1000 / 60);
                     let lastestTime = {
                        time: timeDiffMin,
                        unit: "m",
                     };
                     if (lastestTime.time === 0) {
                        lastestTime = {
                           time: 1,
                           unit: "m",
                        };
                     }
                     if (lastestTime.time >= 60) {
                        lastestTime = {
                           time: Math.floor(lastestTime.time / 60),
                           unit: "h",
                        };
                        if (lastestTime.time >= 24) {
                           lastestTime = {
                              time: Math.floor(lastestTime.time / 24),
                              unit: "d",
                           };
                        }
                     }
                     return (
                        <Item
                           key={conversation.idConversation}
                           isOnline={isOnline}
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
         {currentPageRef.current < maxPageRef.current && <Chip label="Get more" onClick={handleNextPage} sx={{ width: "100%" }} />}
         <Divider />
      </Box>
   );
};

export default memo(Container);
