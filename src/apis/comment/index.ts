import axios from "./axios";

export const createComment = async (payload) => {
   const { id, comment } = payload;
   return await axios.post(`/${id}`, {
      comment: comment,
   });
};

// [DELETE] comments:/:id/:idComment
export const deleteComment = async (payload: { idPost: string; idComment: string }) => {
   const { idPost, idComment } = payload;
   return await axios.delete(`/${idPost}/${idComment}`);
};
