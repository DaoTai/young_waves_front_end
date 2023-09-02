import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { Avatar, Box, Fab, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Container } from "./styles";
import { ChatContext } from "../../../../Contexts/contexts";
const VideoCall = () => {
  const { socket } = useContext(ChatContext);
  const { payload } = useSelector(authState$);
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const [idFriend, setIdFriend] = useState<string>("");
  const [stream, setStream] = useState<MediaStream>();
  const myVideo = useRef<HTMLVideoElement>(Object(null));
  const friendVideo = useRef<HTMLVideoElement>(Object(null));
  useEffect(() => {
    if (!socket) return;
    let localStream: MediaStream;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        localStream = stream;
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket?.emit("getIdFriend", socket.id);

    socket?.on("receiveIdFriend", (data) => {
      console.log("Data: ", data);
    });

    return () => {
      const videoTracks = localStream?.getVideoTracks();
      videoTracks.forEach((track) => {
        track.stop();
      });
    };
  }, [socket]);

  const handleToggleCamera = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        const track = videoTracks[0];
        track.enabled = !track.enabled;
      }
    }
    setOpenCamera(!openCamera);
  };

  const handleCall = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket?.emit("callFriend", {
        signal,
        userFrom: payload.user,
      });
    });
  };

  const handleLeave = async () => {};

  return (
    <Container
      sx={{
        video: {
          width: "100%",
          borderRadius: 2,
          boxShadow: 2,
        },
      }}
    >
      <Typography variant="gradient" component={"h1"} textAlign={"center"} gutterBottom>
        Video Chatting
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Box sx={{ position: "relative" }}>
            <video ref={myVideo} autoPlay playsInline></video>
            {/* When close camera */}
            {!openCamera && (
              <Box
                position={"absolute"}
                sx={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <Avatar
                  src={payload?.user.avatar}
                  sx={{ width: 200, height: 200, boxShadow: 2, border: "2px solid #fff" }}
                />
                <Typography
                  variant="gradient"
                  fontSize={18}
                  component={"h6"}
                  textAlign={"center"}
                  gutterBottom
                  sx={{ mt: 1 }}
                >
                  {payload?.user.fullName}
                </Typography>
              </Box>
            )}
          </Box>
          {/* Controls */}
          <Stack
            mt={2}
            flexDirection={"row"}
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Fab color="info" onClick={handleToggleCamera}>
              {openCamera ? <VideocamIcon /> : <VideocamOffIcon />}
            </Fab>
            <Fab onClick={handleLeave} color="error">
              <PhoneDisabledIcon />
            </Fab>
          </Stack>
        </Grid>

        {/* Friend video */}
        <Grid item md={6} xs={12}>
          <Typography variant="gradient" textAlign={"center"}>
            Friend video
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VideoCall;
