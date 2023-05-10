import { Message } from "../../utils/interfaces/Chat";
import { axiosInstance } from "../config";
export const createMessage = async (payload: Partial<Message>) => {
   return await axiosInstance.post<Message>("/messages/", payload);
};
