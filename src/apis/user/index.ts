import {} from "../../utils/interfaces/Auth";
import { Profile } from "../../utils/interfaces/Profile";
import axiosInstance from "./axios";

export const getAllUser = async (query?: { page?: number; name?: string }) => {
   return await axiosInstance.get("/all", {
      params: query,
   });
};

export const getProfile = async (id: string) => {
   return await axiosInstance.get(`/${id}`);
};

export const updateProfile = async (user: Profile) => {
   return await axiosInstance.patch(`/${user._id}`, user);
};

export const changePasswordProfile = async (user: Partial<Profile>) => {
   return await axiosInstance.patch(`/${user._id}/new-password`, user);
};

export const getFriends = async (idUser: string, page?: number, searchValue?: string) => {
   if (searchValue) {
      return await axiosInstance.get(`/friends/${idUser}`, {
         params: {
            page,
            searchValue,
         },
      });
   } else {
      return await axiosInstance.get(`/friends/${idUser}`, {
         params: {
            page,
         },
      });
   }
};

export const addFriend = async (idUser: string) => {
   return idUser && (await axiosInstance.patch(`/add-friend/${idUser}`));
};

export const cancelFriend = async (idUser: string) => {
   return idUser && (await axiosInstance.patch(`/cancel-friend/${idUser}`));
};
