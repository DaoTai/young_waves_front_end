import {} from "../../utils/interfaces/Auth";
import axiosInstance from "./axios";
export const getProfile = async (id: string, token: string) => {
   return await axiosInstance.get(`/${id}`, {
      headers: {
         token: "Bearer " + token,
      },
   });
};
