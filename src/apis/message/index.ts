import { storageImages, deleteMultipleImages } from "../../firebase/services";
import { SendMessage, Message } from "../../utils/interfaces/Chat";
import { axiosInstance } from "../config";
export const createMessage = async (payload: SendMessage) => {
   const attachments = payload.attachments && (await storageImages(payload.attachments));
   delete payload.attachments;
   return await axiosInstance.post<Message>("/messages/", { ...payload, attachments });
};

export const deleteMessage = async (id: string) => {
   const res = await axiosInstance.delete<Message>("/messages/" + id);
   const deletedAttachments = res.data?.attachments?.map((attach) => attach.url);
   deletedAttachments && (await deleteMultipleImages(deletedAttachments));
   return res.statusText;
};
