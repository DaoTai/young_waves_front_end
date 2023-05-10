import { Post, DetailPost } from "../../utils/interfaces/Post";
import { axiosInstance } from "../config";
export const getPosts = async (page: number = 1) => {
   return await axiosInstance.get("/posts", {
      params: { page },
   });
};

export const searchPosts = async (q: string) => {
   return await axiosInstance.get("/posts/search", {
      params: { q },
   });
};

export const getDetailPost = async (payload: { id: string; page?: number }) => {
   return await axiosInstance.get<DetailPost>(`/posts/${payload.id}`, {
      params: {
         pageComment: payload.page || 1,
      },
   });
};

export const getDetailTrashPost = async (id: string) => {
   return await axiosInstance.get(`/posts/trash/${id}`);
};

export const getOwnerPosts = async (payload: { id: string; page?: number }) => {
   return await axiosInstance.get(`/posts/owner/${payload.id}`, {
      params: {
         page: payload.page || 1,
      },
   });
};

export const getTrashPosts = async (page: number = 1) => {
   return await axiosInstance.get("/posts/trash", {
      params: {
         page,
      },
   });
};

export const createPost = async (payload: Post) => {
   return await axiosInstance.post(`/posts/`, payload);
};

export const updatePost = async (payload: Partial<Post>) => {
   return payload._id && (await axiosInstance.put(`/posts/${payload._id}`, payload));
};

export const restorePost = async (id: string) => {
   return await axiosInstance.patch(`/posts/${id}`);
};

export const deletePost = async (id: string) => {
   return await axiosInstance.delete(`/posts/${id}`);
};

export const forceDeletePost = async (id: string) => {
   return id && (await axiosInstance.delete(`/posts/${id}/force-delete`));
};
export const likePost = async (id: string) => {
   return await axiosInstance.post(`/posts/${id}/like`);
};

export const unlikePost = async (id: string) => {
   return await axiosInstance.post(`/posts/${id}/unlike`);
};
