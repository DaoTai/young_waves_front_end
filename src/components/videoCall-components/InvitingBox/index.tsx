import CallIcon from "@mui/icons-material/Call";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { Profile } from "../../../utils/interfaces/Profile";
import { Avatar, Box, Fab, Modal, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { VideoCallContext } from "../../../Contexts/contexts";

const InvitingBox = () => {
  const { friend, onAccept, onDeny } = useContext(VideoCallContext);
  return (
    <Modal open>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        position={"absolute"}
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Avatar
          src={friend?.avatar}
          sx={{ width: 200, height: 200, boxShadow: 2, mb: 2, border: "2px solid #fff" }}
        />
        <Typography variant="h5" color="cyan" gutterBottom>
          {friend?.fullName} is calling you
        </Typography>
        <Stack flexDirection={"row"} alignItems={"baseline"} gap={2}>
          <Fab onClick={onAccept} color="success">
            <CallIcon />
          </Fab>
          <Fab onClick={onDeny} color="error">
            <PhoneDisabledIcon color="disabled" />
          </Fab>
        </Stack>
      </Box>
    </Modal>
  );
};

export default InvitingBox;
