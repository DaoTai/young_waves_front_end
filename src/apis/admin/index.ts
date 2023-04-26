import { Profile } from "../../utils/interfaces/Profile";
import { axiosInstance } from "../config";

// [GET] admin/users
export const getAllUserByAdmin = async (query?: { page?: number; admin?: boolean }) => {
   return await axiosInstance.get("/admin/users", {
      params: query,
   });
};

// [DELETE] admin/users/:id
export const deleteUser = async (idUser: string) => {
   return await axiosInstance.delete(`/admin/users/${idUser}`);
};

// [GET] admin/trash-users
export const getTrashedUsers = async (query: { admin?: boolean }) => {
   return await axiosInstance.get("/admin/users/trash-users", {
      params: query,
   });
};

// [PATCH] admin/users/:id/restore
export const restoreTrashedUser = async (idUser: string) => {
   return await axiosInstance.patch(`/admin/users/${idUser}/restore`);
};

// [DELETE] admin/users/:id/force-delete
export const forceDeleteUser = async (idUser: string) => {
   return await axiosInstance.delete(`/admin/users/${idUser}/force-delete`);
};

// [PATCH] admin/authorization/:id
export const authorizeUser = async (idUser: string, isAdmin: boolean) => {
   return await axiosInstance.patch(`/admin/authorization/${idUser}`, {
      isAdmin,
   });
};

// [PATCH] admin/users/:id
export const editUser = async (user: Partial<Profile>) => {
   return await axiosInstance.patch(`/admin/users/${user._id}`, user);
};
