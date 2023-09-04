import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import { Fab, Tooltip, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FormatConversation } from "../../../utils/interfaces/Chat";
import Dialog from "../../Dialog";
import { ChatContext, VideoCallContext } from "../../../Contexts/contexts";
import { useSelector } from "react-redux";
import { authState$ } from "../../../redux-saga/redux/selectors";
const VideoStreamControl = ({ conversation }: { conversation: FormatConversation }) => {
  const { socket } = useContext(ChatContext);
  const {
    payload: { user },
  } = useSelector(authState$);
  const [idSocketFriend, setIdSocketFriend] = useState<string>();
  const videoCallContext = useContext(VideoCallContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    socket?.emit("getIdSocketFriend", conversation.friend._id);

    socket?.on("receiveIdSocketFriend", (id: string) => {
      setIdSocketFriend(id);
    });
  }, []);

  const onCloseDialog = () => setOpenDialog(false);
  const navigateToVideoCallPage = () => {
    const listUser = [
      {
        idUser: user._id,
        idSocket: socket?.id,
      },
      {
        idUser: conversation.friend._id,
        idSocket: idSocketFriend,
      },
    ];

    socket?.emit("inviteToCall", conversation.idConversation, listUser);
    window.open("/user/chats/video-call/" + conversation.idConversation, "_blank")?.focus();
  };

  return (
    <>
      <Tooltip title="Video stream" placement="top">
        <Fab
          size="small"
          onClick={() => setOpenDialog(true)}
          sx={{ background: theme.palette.gradient.main, boxShadow: 1 }}
        >
          <CameraIndoorIcon color="primary" sx={{ color: theme.palette.white.main }} />
        </Fab>
      </Tooltip>

      <Dialog
        open={openDialog}
        title="Open video stream"
        content="Do you want to open video stream?"
        onClose={onCloseDialog}
        onSubmit={navigateToVideoCallPage}
      />
    </>
  );
};

export default VideoStreamControl;
