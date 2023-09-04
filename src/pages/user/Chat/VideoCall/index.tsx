import MicNoneIcon from "@mui/icons-material/MicNone";
import MicOffIcon from "@mui/icons-material/MicOff";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { Avatar, Box, Fab, Grid, Stack, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { ChatContext, VideoCallContext } from "../../../../Contexts/contexts";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Container } from "./styles";

const VideoCall = () => {
  //idFriend chưa sửa thành idConversation
  const { idConversation } = useParams();
  const { socket } = useContext(ChatContext);
  const videoCallContext = useContext(VideoCallContext);
  const {
    payload: { user },
  } = useSelector(authState$);
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const [enableMic, setEnableMic] = useState<boolean>(false);
  const [isAccepted, setAccepted] = useState<boolean>(false);
  const [isInviting, setInviting] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream>();
  const [friendSignal, setFriendSignal] = useState<Peer.SignalData | string>("");
  const [idSocketFriend, setIdSocketFriend] = useState<string>("");
  const myVideo = useRef<HTMLVideoElement>(Object(null));
  const friendVideo = useRef<HTMLVideoElement>(Object(null));
  const connectionRef = useRef<Peer.Instance>();
  useEffect(() => {
    if (!socket || !idConversation) return;
    socket?.emit("getOnlineUsers");
    // socket?.on("onlineUsers", (idOnlineFriends: string[]) => {
    //   const offlineFriend = !idOnlineFriends.includes(idFriend);
    //   if (offlineFriend) {
    //     window.close();
    //   }
    // });
    let localStream: MediaStream;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: enableMic,
      })
      .then((stream) => {
        localStream = stream;
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    // Get id socket of friend
    socket?.emit("getIdSocketFriend", idConversation);
    socket?.on("receiveIdSocketFriend", (idSocket: string) => {
      setIdSocketFriend(idSocket);
    });

    return () => {
      const videoTracks = localStream?.getVideoTracks();
      videoTracks.forEach((track) => {
        track.stop();
      });
    };
  }, [socket]);

  // Close modal inviting
  const onCloseModal = useCallback(() => {
    setInviting(false);
  }, []);

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

  const handleToggleMic = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        const track = audioTracks[0];
        track.enabled = !track.enabled;
      }
    }
    setEnableMic(!enableMic);
  };

  // Call friend
  const handleCall = () => {
    console.log("stream: ", stream);

    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });
    } catch (err) {
      console.log("Error: ", err);
    }

    // peer.on("connect", () => {
    //   console.log("Connect peer");
    // });

    // peer.on("close", () => {
    //   console.log("friend closed");
    // });

    // peer.on("signal", (signal) => {
    //   socket?.emit("callFriend", {
    //     signal,
    //     userFrom: user,
    //     idSocketTo: idSocketFriend,
    //     idSocketFrom: socket.id,
    //   });
    // });

    // Nhận được tín hiệu stream từ friend
    // peer.on("stream", (stream: MediaStream) => {
    //   friendVideo.current.srcObject = stream;
    // });

    // socket?.on("accepted", (signal) => {
    //   if (peer.readable) {
    //     // setAccepted(true);
    //     peer.signal(signal);
    //   } else {
    //     console.log("Peer unreadable");
    //   }
    // });

    // connectionRef.current = peer;
  };

  // Answer call
  const handleAnswer = () => {
    setInviting(false);
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
            <video ref={myVideo} autoPlay playsInline />
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
                  src={user.avatar}
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
                  {user.fullName}
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
            <Fab color="info" onClick={handleCall}>
              Call
            </Fab>
            <Fab color="info" onClick={handleToggleCamera}>
              {openCamera ? <VideocamIcon /> : <VideocamOffIcon />}
            </Fab>
            <Fab color="warning" onClick={handleToggleMic}>
              {enableMic ? <MicNoneIcon /> : <MicOffIcon />}
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
          <video ref={friendVideo} autoPlay playsInline />
        </Grid>
      </Grid>
    </Container>
  );
};

export default VideoCall;
