import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Fab,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import dateformat from "dateformat";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { ChatContext } from "../../../../../Contexts/contexts";
import * as api from "../../../../../apis";
import { CloseButton, ImageInput, Textarea } from "../../../../../components";
import { showAlert } from "../../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { Attachment } from "../../../../../utils/interfaces/Attachment";
import {
  FormatConversation,
  Message as IMessage,
} from "../../../../../utils/interfaces/Chat";
import { Body, Footer, WrapAttachments, WrapperChat } from "../styles";
import Message from "./Message";

interface ReceivedMsg {
  id: string;
  idSender: string;
  text: string;
  attachments: any[];
}

const ChatFrame = ({ conversation }: { conversation: FormatConversation }) => {
  const auth$ = useSelector(authState$);
  const dispatch = useDispatch();
  const idAuth = auth$.payload?.user?._id;
  const theme = useTheme();
  const { socket, handleUpdateLastestMsg } = useContext(ChatContext);
  // Refs
  const bodyRef = useRef<HTMLDivElement>(null);
  const maxPageRef = useRef<number>(1);
  const currentPageRef = useRef<number>(1);
  // States
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const friendAvatar = conversation.friend?.avatar;
  // Work with socket
  useEffect(() => {
    if (!socket) return;

    socket?.emit("joinConversation", conversation.idConversation);

    socket?.on("getMessage", (dataGot: ReceivedMsg) => {
      const { idSender, text, attachments, id } = dataGot;
      const newMessage: IMessage = {
        _id: id,
        sender: idSender,
        text: text,
        createdAt: dateformat(String(new Date())),
        attachments: attachments,
      };
      setMessages((oldMsgs) => [newMessage, ...oldMsgs]);
      handleUpdateLastestMsg({
        idConversation: conversation.idConversation,
        text: text,
        attachments: attachments,
        sender: idSender,
      });
    });
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  // Call api to get messages
  useEffect(() => {
    bodyRef.current?.scrollIntoView({ behavior: "smooth" });
    conversation?.idConversation &&
      (async () => {
        try {
          const { data } = await api.conversation.getDetailConversation({
            id: conversation?.idConversation as string,
          });
          setMessages(data.messages);
          maxPageRef.current = data.maxPage;
        } catch (err) {
          console.error(err);
        }
      })();
  }, [conversation]);

  // Get more messages
  const fetchMoreData = async () => {
    currentPageRef.current++;
    if (currentPageRef.current <= maxPageRef.current) {
      try {
        const { data } = await api.conversation.getDetailConversation({
          id: conversation?.idConversation as string,
          page: currentPageRef.current,
        });
        setMessages((prev) => [...prev, ...data.messages]);
      } catch (err) {
        console.error(err);
      }
    } else {
      setHasMore(false);
    }
  };

  // Input message
  const onInputMsg = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  // Send message
  const handleSendMsg = useCallback(async () => {
    if (!isLoading && message.trim()) {
      setAttachments([]);
      setMessage("");
      const files = attachments.map((attach) => attach?.file);
      const payload = {
        idConversation: conversation?.idConversation as string,
        sender: idAuth,
        text: message.trim(),
      };
      // If exist attachments
      files && Object.assign(payload, { attachments: files });

      try {
        setLoading(true);
        const res = await api.message.createMessage(payload);
        if (res.statusText === "OK") {
          const { _id, attachments } = res.data;
          const { friend, idConversation } = conversation;

          socket?.emit("sendMessage", {
            id: _id,
            idSender: idAuth,
            idReceiver: friend?._id,
            idConversation: idConversation,
            text: message.trim(),
            attachments: attachments,
          });
          setMessages((prev) => [res.data, ...prev]);
          handleUpdateLastestMsg(payload);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [message, attachments]);

  // Delete message
  const handleDeleteMsg = useCallback(async (idDeleteMsg: string) => {
    if (idDeleteMsg) {
      try {
        setLoading(true);
        const statusText = await api.message.deleteMessage(idDeleteMsg);
        if (statusText === "OK") {
          setMessages((prev) => {
            return prev.filter((msg) => msg._id !== idDeleteMsg);
          });
        }
      } catch (err) {
        console.error(err);
        dispatch(
          showAlert({
            title: "Chat message",
            message: "Send message failed",
            mode: "error",
          })
        );
      }
      setLoading(false);
    }
  }, []);

  // Get preview attachments
  const getAttachments = (files: File[], blobs: string[]) => {
    const newAttachments: Attachment[] = blobs.map((blob, index) => ({
      url: blob,
      file: files[index],
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  // Remove preview attachments
  const handleRemoveAttachments = (attachment: Attachment) => {
    const newAttachments = attachments.filter(
      (attach) => attach.url !== attachment.url
    );
    setAttachments(newAttachments);
    URL.revokeObjectURL(attachment.url);
  };

  return (
    <WrapperChat>
      {/* Body */}
      <Body ref={bodyRef}>
        {messages.length === 0 ? (
          <Typography
            variant="body1"
            component="h6"
            textAlign="center"
            height="100%"
          >
            You don't have message. <br /> Let's chat together
          </Typography>
        ) : (
          <InfiniteScroll
            height={"100%"}
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              gap: 8,
              height: "100%",
            }}
            inverse={true}
            scrollableTarget="scrollableDiv"
            dataLength={messages.length}
            hasMore={hasMore}
            next={fetchMoreData}
            loader={
              <Typography variant="body2" textAlign="center">
                Loading ...
              </Typography>
            }
          >
            {messages.map((message) => {
              return (
                <Message
                  key={message._id}
                  message={message}
                  friendAvatar={friendAvatar as string}
                  onDelete={handleDeleteMsg}
                />
              );
            })}
          </InfiniteScroll>
        )}
      </Body>
      {isLoading && (
        <Typography
          variant="subtitle1"
          color="secondary"
          component="span"
          textAlign="center"
          fontSize="small"
        >
          Message is handling ...
        </Typography>
      )}
      {/* Footer */}

      <Footer flexDirection={"row"} gap={2} p={1}>
        <ImageInput width={40} height={40} multiple onChange={getAttachments} />
        {/* Chat input */}
        <Stack
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
          overflow={"hidden"}
          spacing={1}
        >
          {attachments.length > 0 && (
            <WrapAttachments>
              {attachments.map((attach, index) => (
                <Box key={attach.url + index} position="relative">
                  <img width="100%" height="100%" src={attach.url} />
                  <CloseButton
                    size="small"
                    onClick={() => handleRemoveAttachments(attach)}
                  />
                </Box>
              ))}
            </WrapAttachments>
          )}
          {/* Form input */}
          <TextField
            id="form-chat"
            spellCheck={false}
            value={message}
            onChange={onInputMsg}
            onKeyDown={(e) => e.key === "Enter" && handleSendMsg()}
          />
        </Stack>
        <Fab size="medium" id="send-btn" onClick={handleSendMsg}>
          <SendIcon sx={{ color: theme.palette.link.main }} />
        </Fab>
      </Footer>
    </WrapperChat>
  );
};

export default ChatFrame;
