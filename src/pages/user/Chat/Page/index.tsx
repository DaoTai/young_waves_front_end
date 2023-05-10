import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Fab, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { FormatConversation } from "../../../../utils/interfaces/Chat";
import ChatForm from "../ChatBox/ChatForm";
import ListData from "../Conversations/Container";
import { FallbackMessage, WrapperPage } from "./styles";
import Icon from "/vite.svg";
const PageChat = () => {
   const navigate = useNavigate();
   const theme = useTheme();
   const [conversation, setConversation] = useState<FormatConversation | null>(null);

   const handleShowChatFrame = useCallback((conv: FormatConversation) => {
      setConversation(conv);
   }, []);

   return (
      <>
         <Helmet>
            <title> Chat | Young Waves </title>
         </Helmet>
         <WrapperPage maxWidth="xl">
            <Grid container flexWrap="nowrap" height="100%">
               {/* Conversation */}
               <Grid item lg={4} p={1} sx={{ bgcolor: theme.myColor.white, overflowY: "scroll" }}>
                  <Stack gap={2}>
                     <Typography className="title" flex={1} variant="h4">
                        My chat
                     </Typography>
                     <ListData onClickItem={handleShowChatFrame} />
                  </Stack>
               </Grid>

               {/* Frame chat */}
               <Grid
                  item
                  lg={8}
                  pt={1}
                  boxShadow={2}
                  bgcolor={theme.myColor.white}
                  width="100%"
                  height="100%">
                  {conversation ? (
                     <ChatForm conversation={conversation} />
                  ) : (
                     <FallbackMessage>
                        <Typography className="title" variant="h4">
                           Welcome to Chat Young Waves
                        </Typography>
                        <img src={Icon} width={200} alt="Logo" />
                     </FallbackMessage>
                  )}
               </Grid>
            </Grid>
         </WrapperPage>
      </>
   );
};

export default PageChat;
