import { axiosInstance } from "../config";

export const addConversation = async (idFriend: string) => {
   return await axiosInstance.post("/conversations/", {
      idFriend,
   });
};

export const getAllConversation = async () => {
   return await axiosInstance.get("/conversations/");
};

export const getDetailConversation = async (id: string) => {
   return await axiosInstance.get(`/conversations/${id}`);
};
