import { storageImages, deleteMultipleImages, storageImage } from "../../firebase/services";
import { Post, DetailPost, CreatePost, UpdatePost } from "../../utils/interfaces/Post";
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

export const createPost = async (payload: CreatePost) => {
   let urls: string[] = [];
   if (payload.attachments) {
      urls = await storageImages(payload.attachments);
   }
   const data = {
      ...payload,
      attachments: urls,
   };
   return await axiosInstance.post<Post>(`/posts/`, data);
};

export const updatePost = async (payload: UpdatePost) => {
   let urls: string[] = [];
   if (payload?.newAttachments) {
      urls = await storageImages(payload.newAttachments);
   }
   const data = {
      ...payload,
      attachments: [...(payload.attachments ?? []), ...urls],
   };

   return payload._id && (await axiosInstance.put<Post>(`/posts/${payload._id}`, data));
};

export const restorePost = async (id: string) => {
   return await axiosInstance.patch(`/posts/${id}`);
};

export const deletePost = async (id: string) => {
   return await axiosInstance.delete(`/posts/${id}`);
};

export const forceDeletePost = async (id: string) => {
   const { data, statusText } = await axiosInstance.delete<Post>(`/posts/${id}/force-delete`);
   await deleteMultipleImages(data.attachments);
   return statusText;
};
export const likePost = async (id: string) => {
   return await axiosInstance.post(`/posts/${id}/like`);
};

export const unlikePost = async (id: string) => {
   return await axiosInstance.post(`/posts/${id}/unlike`);
};
