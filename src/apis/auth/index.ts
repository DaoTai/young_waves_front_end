import axios from "axios";
import axiosInstance from "./axios";
import { SignIn } from "../../utils/interfaces/Auth";
export const signInUser = async (user: SignIn) => {
   return await axiosInstance.post("/login", {
      username: user.username,
      password: user.password,
   });
};
