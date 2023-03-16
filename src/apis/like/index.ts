import axiosInstance from "./axios";

export const getLikes = async (id: string) => {
   return await axiosInstance.get(`/${id}`);
};

export const handleLike = async (idPost: string) => {
   return await axiosInstance.post(`/${idPost}`);
};
