import { axiosInstance } from "../config";

export const addConversation = async (idFriend: string) => {
   return await axiosInstance.post("/conversations/", {
      idFriend,
   });
};

export const getAllConversation = async (q: { friendName?: string; page?: number }) => {
   return await axiosInstance.get("/conversations/", {
      params: q,
   });
};

export const getDetailConversation = async (id: string) => {
   return await axiosInstance.get(`/conversations/${id}`);
};
