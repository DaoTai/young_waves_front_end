import {} from "../../utils/interfaces/Auth";
import { Profile } from "../../utils/interfaces/Profile";
import axiosInstance from "./axios";

export const getAllUser = async (query: { page?: number; name?: string }) => {
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
