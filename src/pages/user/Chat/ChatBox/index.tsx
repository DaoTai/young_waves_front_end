import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Avatar,
  Divider,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChatContext } from "../../../../Contexts/contexts";
import { ChatBoxWrapperProps } from "../../../../utils/interfaces/Chat";
import { StyledBadge } from "../Conversations/Container/styles";
import ChatForm from "./ChatForm";
import { Floating, Heading, MyChatBox } from "./styles";
import { VideoStreamControl } from "../../../../components";

const ChatBox = ({ conversation, onClose = () => {} }: ChatBoxWrapperProps) => {
  const location = useLocation();
  const chatContext = useContext(ChatContext);
  const [hide, setHide] = useState<boolean>(false);
  const isOnline = chatContext.onlineIdUsers?.includes(
    conversation.friend._id as string
  );
  const toggleHide = () => setHide(!hide);

  useEffect(() => {
    if (location.pathname === "/user/chats") {
      onClose(conversation.idConversation as string);
    }
  }, [location]);

  // Display floating balloon
  if (hide) {
    return (
      <Tooltip title={conversation.friend?.fullName} arrow>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant={isOnline ? "dot" : "standard"}
        >
          <Floating
            onClick={toggleHide}
            alt={conversation.friend?.fullName}
            src={conversation.friend?.avatar}
          />
        </StyledBadge>
      </Tooltip>
    );
  }

  return (
    <>
      {!!conversation.idConversation && (
        <MyChatBox
          sx={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* Heading */}
          <Heading>
            {/* Link to profile */}
            <Link to={`/user/explore/${conversation.friend._id}`}>
              <Stack flexDirection="row" alignItems="center" gap={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant={isOnline ? "dot" : "standard"}
                >
                  <Avatar
                    sx={{
                      width: 42,
                      height: 42,
                      border: 1,
                      img: {
                        objectFit: "cover",
                        objectPosition: "center",
                      },
                    }}
                    alt={conversation.friend?.fullName}
                    src={conversation.friend?.avatar}
                  />
                </StyledBadge>
                <Typography
                  component="span"
                  textOverflow="ellipsis"
                  width={100}
                  flex={2}
                >
                  {conversation.friend?.fullName}
                </Typography>
              </Stack>
            </Link>

            {/* Đang gặp vấn đề về vite với webrtc */}
            {/* 
            {isOnline && conversation.friend._id && (
              <VideoStreamControl conversation={conversation} />
            )} */}
            <Stack flexDirection="row" alignItems="center">
              {/* Hide button */}
              <ListItem onClick={toggleHide}>
                <RemoveIcon />
              </ListItem>
              {/* Close button */}
              <ListItem
                onClick={() => onClose(conversation.idConversation as string)}
              >
                <CloseIcon />
              </ListItem>
            </Stack>
          </Heading>
          <Divider />

          <ChatForm conversation={conversation} />
        </MyChatBox>
      )}
    </>
  );
};

export default memo(ChatBox);
