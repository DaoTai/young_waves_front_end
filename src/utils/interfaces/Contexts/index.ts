import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { FormatConversation, SendMessage } from "../../interfaces/Chat";
import { Socket } from "socket.io-client";
export interface ChatContext {
  socket: Socket | undefined;
  updatedConversation: SendMessage | undefined;
  onlineIdUsers: string[];
  handleShowChatBox: (data: FormatConversation) => void;
  handleUpdateLastestMsg: (data: SendMessage) => void;
}

export interface ICall {
  isReceivingCall: boolean;
  from: any;
  name: any;
  signal: any;
}

export interface VideoStreamContext {
  openStream: boolean;
  callAccepted: boolean;
  callEnded: boolean;
  myVideo: MutableRefObject<HTMLVideoElement | null>;
  friendVideo: MutableRefObject<HTMLVideoElement | null>;
  call: ICall | undefined;
  stream: MediaStream | undefined;
  name: string;
  me: string;
  setName: Dispatch<SetStateAction<string>>;
  handleOnStream: () => void;
  callUser: any;
  leaveCall: any;
  answerCall: any;
}
