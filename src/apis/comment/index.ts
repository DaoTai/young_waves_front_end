import axios from "./axios";

export const createComment = async (payload) => {
   const { id, comment } = payload;
   return await axios.post(`/${id}`, {
      comment: comment,
   });
};
