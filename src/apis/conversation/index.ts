import { ResponseConversation } from "../../utils/interfaces/Chat";
import { axiosInstance } from "../config";

export const addConversation = async (idFriend: string) => {
   return await axiosInstance.post("/conversations/", {
      idFriend,
   });
};

export const getAllConversation = async (q: { friendName?: string; page?: number }) => {
   return await axiosInstance.get<ResponseConversation>("/conversations/", {
      params: q,
   });
};

export const getDetailConversation = async (payload: { id: string; page?: number }) => {
   return await axiosInstance.get(`/conversations/${payload.id}`, {
      params: {
         page: payload.page || 1,
      },
   });
};
