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
   try {
      const res = await axiosInstance.post("/refresh", { withCredentials: true });
      return res.data;
   } catch (err) {
      Promise.reject(err);
   }
};

export const forgotPassword = async (data: { username: string; email: string }) => {
   return await axiosInstance.post("/forgot-password", data);
};
