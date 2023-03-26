import axiosInstance from "./axios";

export const createMessage = async (payload: {
   idConversation: string;
   sender: string;
   text: string;
}) => {
   return await axiosInstance.post("/", payload);
};
