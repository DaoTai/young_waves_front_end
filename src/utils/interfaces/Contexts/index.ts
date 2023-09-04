import Peer from "simple-peer";
import { Socket } from "socket.io-client";
import { FormatConversation, SendMessage } from "../../interfaces/Chat";
import { Profile } from "../Profile";
export interface IChatContext {
  socket: Socket | undefined;
  updatedConversation: SendMessage | undefined;
  onlineIdUsers: string[];
  handleShowChatBox: (data: FormatConversation) => void;
  handleUpdateLastestMsg: (data: SendMessage) => void;
}

export interface IVideoCallChatContext {
  isInviting: boolean;
  isAccept: boolean;
  friend: Partial<Profile>;
  friendSignal: Peer.SignalData | string;
  setFriend: (value: Partial<Profile>) => void;
  onAccept: () => void;
  onDeny: () => void;
}
