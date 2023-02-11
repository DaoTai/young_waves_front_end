import { Post } from "../../utils/interfaces/Post";
import axios from "./axios";
export const getPosts = async () => {
   return await axios.get("");
};

export const getDetailPost = async (id: string) => {
   return await axios.get(`/${id}`);
};

export const getOwnerPosts = async (id: string) => {
   return await axios.get(`/owner/${id}`);
};

export const createPost = async (payload: Post) => {
   return await axios.post(`/`, payload);
};

export const updatePost = async (id: string, payload: Partial<Post>) => {
   return await axios.put(`/${id}`, payload);
};

export const deletePost = async (id: string) => {
   return await axios.delete(`/${id}`);
};
