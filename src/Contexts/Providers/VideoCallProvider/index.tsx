import React, { useContext, useEffect, useState } from "react";
import { ChatContext, VideoCallContext } from "../../contexts";
import Peer from "simple-peer";
import { Profile } from "../../../utils/interfaces/Profile";

interface IInviteCallData {
  idFrom: string;
  idConversation: string;
  signal: Peer.SignalData;
  userFrom: Profile;
}

const VideoCallProvider = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useContext(ChatContext);
  const [isInviting, setInviting] = useState<boolean>(false);
  const [isAccepted, setAccepted] = useState<boolean>(false);
  const [idConversation, setIdConversation] = useState<string>("");
  const [friend, setFriend] = useState<Partial<Profile>>();
  const [friendSignal, setFriendSignal] = useState<Peer.SignalData | string>("");
  useEffect(() => {
    if (!socket) return;
    socket.on("invite", (data: IInviteCallData) => {
      console.log("Ai gọi này");
      setIdConversation(data.idConversation);
      setInviting(true);
      setFriend(data.userFrom);
      setFriendSignal(data.signal);
    });
  }, [socket]);

  const onAccept = () => {
    setInviting(false);
    setAccepted(true);
    window.open("/user/chats/video-call/" + idConversation, "_blank")?.focus();
  };

  const onDeny = () => {
    setInviting(false);
  };

  //   Đang set up dở
  const value = {
    isInviting,
    isAccepted,
    friendSignal,
    friend,
    setFriend,
    onAccept,
    onDeny,
  };
  return <VideoCallContext.Provider value={value}>{children}</VideoCallContext.Provider>;
};

export default VideoCallProvider;
