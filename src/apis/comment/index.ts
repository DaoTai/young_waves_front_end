import axios from "./axios";

// [POST] comments/:id
export const createComment = async (payload: { idPost: string; comment: string }) => {
   if (payload.idPost) {
      return await axios.post(`/${payload.idPost}`, {
         comment: payload.comment,
      });
   }
};

// [PUT] comments/:id/:idComment
export const editComment = async (idPost: string, idComment: string, updatedComment: string) => {
   return await axios.put(`/${idPost}/${idComment}`, {
      comment: updatedComment,
   });
};

// [DELETE] comments:/:id/:idComment
export const deleteComment = async (payload: { idPost: string; idComment: string }) => {
   return await axios.delete(`/${payload.idPost}/${payload.idComment}`);
};
