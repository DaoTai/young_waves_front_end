import { deleteMultipleImages, storageImage } from "../../firebase/services";
import { Profile, UpdateProfile } from "../../utils/interfaces/Profile";
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
   const res = await axiosInstance.delete(`/admin/users/${idUser}/force-delete`);
   await deleteMultipleImages(res.data?.deletedAttachments);
   return res.statusText;
};

// [PATCH] admin/authorization/:id
export const authorizeUser = async (idUser: string, isAdmin: boolean) => {
   return await axiosInstance.patch(`/admin/authorization/${idUser}`, {
      isAdmin,
   });
};

// [PATCH] admin/users/:id
export const editUser = async (user: UpdateProfile) => {
   if (user.newAvatar) {
      user.avatar = await storageImage(user.newAvatar);
   }
   delete user.newAvatar;
   return await axiosInstance.patch(`/admin/users/${user._id}`, user);
};

// [POST] admin/users/handle-all
export const handleAll = async (payload: {
   action: string;
   memberIds: string[];
   role?: string;
}) => {
   const res = await axiosInstance.post("/admin/users/handle-all", payload);

   if (res.data.deletedAttachments) {
      await deleteMultipleImages(res.data.deletedAttachments);
   }
   return res;
};
