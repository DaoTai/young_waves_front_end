import axiosInstance from "./axios";

export const getLikes = async (id: string) => {
   return await axiosInstance.get(`/${id}`);
};

export const handleLike = async (id: string) => {
   return await axiosInstance.post(`/${id}`);
};
