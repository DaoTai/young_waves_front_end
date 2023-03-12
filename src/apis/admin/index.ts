import axios from "axios";
import axiosInstance from "./axios";

// [GET] admin/users
export const getAllUserByAdmin = async (query?: { page?: number; admin?: boolean }) => {
   return await axiosInstance.get("/users", {
      params: query,
   });
};

// [DELETE] admin/users/:id
export const deleteUser = async (idUser: string) => {
   return await axiosInstance.delete(`/users/${idUser}`);
};

// [GET] admin/trash-users
export const getTrashedUsers = async (query: { admin?: boolean }) => {
   return await axiosInstance.get("/users/trash-users", {
      params: query,
   });
};

// [PATCH] admin/users/:id/restore
export const restoreTrashedUser = async (idUser: string) => {
   return await axiosInstance.patch(`/users/${idUser}/restore`);
};

// [DELETE] admin/users/:id/force-delete
export const forceDeleteUser = async (idUser: string) => {
   return await axiosInstance.delete(`/users/${idUser}/force-delete`);
};

// [PATCH] admin/authorization/:id
export const authorizeUser = async (idUser: string, isAdmin: boolean) => {
   return await axiosInstance.patch(`/authorization/${idUser}`, {
      isAdmin,
   });
};
