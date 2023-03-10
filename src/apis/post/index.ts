import { Post } from "../../utils/interfaces/Post";
import axios from "./axios";
export const getPosts = async () => {
   return await axios.get("");
};

export const searchPosts = async (q: string) => {
   return await axios.get("/search", {
      params: { q },
   });
};

export const getDetailPost = async (id: string) => {
   return await axios.get(`/${id}`);
};

export const getDetailTrashPost = async (id: string) => {
   return await axios.get(`/trash/${id}`);
};

export const getOwnerPosts = async (id: string) => {
   return await axios.get(`/owner/${id}`);
};

export const getTrashPosts = async () => {
   return await axios.get("/trash");
};

export const createPost = async (payload: Post) => {
   return await axios.post(`/`, payload);
};

export const updatePost = async (id: string, payload: Partial<Post>) => {
   return await axios.put(`/${id}`, payload);
};

export const restorePost = async (id: string) => {
   return await axios.patch(`/${id}`);
};

export const deletePost = async (id: string) => {
   return await axios.delete(`/${id}`);
};

export const forceDeletePost = async (id: string) => {
   return await axios.delete(`/${id}/force-delete`);
};
