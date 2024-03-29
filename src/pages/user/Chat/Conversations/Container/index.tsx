import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ChatContext } from "../../../../../Contexts/contexts";
import * as api from "../../../../../apis/conversation";
import { BaseInput } from "../../../../../components";
import { useDebounce } from "../../../../../hooks";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { FormatConversation } from "../../../../../utils/interfaces/Chat";
import Item from "./Item";
import { ClearButton } from "./styles";

interface Props {
  onClickItem: (conversation: FormatConversation) => void;
}

const Container = ({ onClickItem }: Props) => {
  const theme = useTheme();
  const chatcontext = useContext(ChatContext);
  const {
    payload: { user },
  } = useSelector(authState$);
  const currentPageRef = useRef<number>(1);
  const maxPageRef = useRef<number>(1);
  const [conversations, setConversations] = useState<FormatConversation[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue);

  // Working with fetch api
  useEffect(() => {
    (async () => {
      try {
        const { currentPage, maxPage, conversations } = await fetchApi({
          friendName: debouncedValue,
        });
        setConversations(conversations);
        currentPageRef.current = currentPage;
        maxPageRef.current = maxPage;
      } catch (err) {
        console.error(err);
      }
    })();
  }, [debouncedValue]);

  // When update new conversation
  useEffect(() => {
    const newMsg = chatcontext?.updatedConversation;

    const updateConversations = conversations.map((conv) => {
      if (conv.idConversation === newMsg?.idConversation) {
        Object.assign(conv.lastestMessage, newMsg);
        conv.lastestMessage.updatedAt = String(new Date());
      }
      return conv;
    });
    setConversations(updateConversations);
  }, [chatcontext?.updatedConversation]);

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
              // Check online status
              const isOnline = chatcontext.onlineIdUsers?.includes(
                conversation.friend._id as string
              );
              const now = new Date();
              const specificTime = new Date(String(conversation?.lastestMessage?.updatedAt));
              const timeDiffMs = now.getTime() - specificTime.getTime();
              const timeDiffMin = Math.floor(timeDiffMs / 1000 / 60);
              // Latest time chatting together
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
      {currentPageRef.current < maxPageRef.current && (
        <Chip label="Get more" clickable onClick={handleNextPage} sx={{ width: "100%", mb: 1 }} />
      )}
      <Divider />
    </Box>
  );
};

export default memo(Container);
