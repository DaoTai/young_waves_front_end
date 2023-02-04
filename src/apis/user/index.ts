import {} from "../../utils/interfaces/Auth";
import axiosInstance from "./axios";
export const getProfile = async (user: { id: string; accessToken: string }) => {
   return await axiosInstance.get(`/${user.id}`, {
      headers: {
         token: "Bearer " + user.accessToken,
      },
   });
};
