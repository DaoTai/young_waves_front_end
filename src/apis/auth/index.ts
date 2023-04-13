import { AxiosResponse } from "axios";
import { SignIn, SignUp } from "../../utils/interfaces/Auth";
import axiosInstance from "./axios";
export const signInUser = async (user: SignIn) => {
   return await axiosInstance.post("/login", user);
};

export const signUpUser = async (data: SignUp) => {
   return await axiosInstance.post("/register", data);
};

export const logOutUser = async () => {
   return await axiosInstance.post("/logout");
};

export const refreshToken = async () => {
   return await axiosInstance.post("/refresh", {
      withCredentials: true,
   });
};
