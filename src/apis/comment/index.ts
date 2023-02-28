import axios from "./axios";

// [POST] comments/:id
export const createComment = async (payload: { id: string; comment: string }) => {
   const { id, comment } = payload;
   return await axios.post(`/${id}`, {
      comment: comment,
   });
};

// [PUT] comments/:id/:idComment
export const editComment = async (payload: {
   idPost: string;
   idComment: string;
   updatedComment: string;
}) => {
   const { idPost, idComment, updatedComment } = payload;
   return await axios.put(`/${idPost}/${idComment}`, {
      comment: updatedComment,
   });
};

// [DELETE] comments:/:id/:idComment
export const deleteComment = async (payload: { idPost: string; idComment: string }) => {
   const { idPost, idComment } = payload;
   return await axios.delete(`/${idPost}/${idComment}`);
};
