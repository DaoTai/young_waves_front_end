import { axiosInstance } from "../config";

// [POST] comments/:id
export const createComment = async (payload: { idPost: string; comment: string }) => {
   return await axiosInstance.post(`/comments/${payload.idPost}`, {
      comment: payload.comment,
   });
};

// [PUT] comments/:id/:idComment
export const editComment = async (idPost: string, idComment: string, updatedComment: string) => {
   return await axiosInstance.put(`/comments/${idPost}/${idComment}`, {
      comment: updatedComment,
   });
};

// [DELETE] comments:/:id/:idComment
export const deleteComment = async (payload: { idPost: string; idComment: string }) => {
   return await axiosInstance.delete(`/comments/${payload.idPost}/${payload.idComment}`);
};
