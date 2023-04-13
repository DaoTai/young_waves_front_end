import axios, { AxiosError, AxiosResponse } from "axios";
import { showAlert } from "../../redux-saga/redux/actions";
import { store } from "../../redux-saga/redux/store";
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
   baseURL: "http://localhost:8001/auth",
});
axiosInstance.interceptors.response.use(
   (config: AxiosResponse) => {
      return config;
   },
   (err: AxiosError) => {
      // When sign in failed
      store.dispatch(
         showAlert({
            title: "Sign in",
            message: (err.response?.data as string) || "Server not working",
         })
      );
      return err;
   }
);

export default axiosInstance;
