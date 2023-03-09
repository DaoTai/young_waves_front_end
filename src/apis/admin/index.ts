import axios from "axios";
import axiosInstance from "./axios";

// [GET] admin/users
export const getAllUserByAdmin = async (query?: { page?: number; admin?: boolean }) => {
   return await axiosInstance.get("/users", {
      params: query,
   });
};
