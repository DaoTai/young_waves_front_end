import { Message, SendMessage } from "../../utils/interfaces/Chat";
import { axiosInstance } from "../config";
export const createMessage = async (payload: SendMessage) => {
   return await axiosInstance.post<Message>("/messages/", payload);
};

export const deleteMessage = async (id: string) => {
   const res = await axiosInstance.delete<Message>("/messages/" + id);
   return res.statusText;
};
