import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import { Fab, Tooltip, useTheme } from "@mui/material";
import { useState } from "react";
import Dialog from "../Dialog";
const VideoStreamControl = ({ idFriend }: { idFriend: string }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const theme = useTheme();
  const onCloseDialog = () => setOpenDialog(false);
  const navigateToVideoCallPage = () => {
    window.open("/user/chats/video-call/" + idFriend, "_blank")?.focus();
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
