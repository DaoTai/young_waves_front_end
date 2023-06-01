import axios, { AxiosError, AxiosResponse } from "axios";
import { showAlert } from "../../redux-saga/redux/actions";
import { store } from "../../redux-saga/redux/store";
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
   baseURL: "http://localhost:8001/auth",
});
axiosInstance.interceptors.response.use(
   (config: AxiosResponse<any>) => {
      return config;
   },
   (err: AxiosError) => {
      // When sign in failed
      store.dispatch(
         showAlert({
            title: "Failure",
            message: (err.response?.data as string) || "Server not working",
            mode: "error",
         })
      );
      return err;
   }
);

export default axiosInstance;
