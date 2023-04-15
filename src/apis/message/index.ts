import { axiosInstance } from "../config";
export const createMessage = async (payload: {
   idConversation: string;
   sender: string;
   text: string;
}) => {
   return await axiosInstance.post("/messages/", payload);
};
