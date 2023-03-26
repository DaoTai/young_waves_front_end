import axiosInstance from "./axios";

export const addConversation = async (idFriend: string) => {
   return await axiosInstance.post("/", {
      idFriend,
   });
};

export const getAllConversation = async () => {
   return await axiosInstance.get("/");
};

export const getDetailConversation = async (id: string) => {
   return await axiosInstance.get(`/${id}`);
};
