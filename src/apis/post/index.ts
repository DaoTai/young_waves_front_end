import axios from "./axios";
export const getPosts = async () => {
   return await axios.get("");
};

export const getDetailPost = async (id: string) => {
   return await axios.get(`/${id}`);
};
