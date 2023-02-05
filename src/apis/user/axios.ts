import axios, { AxiosError, AxiosResponse } from "axios";
import store from "../../redux-saga/redux/store";
import { SignInPayload } from "../../utils/interfaces/Action";
const axiosInstance = axios.create({
   baseURL: " http://localhost:8001/user",
});

axiosInstance.interceptors.request.use(
   function (config) {
      const signInPayload = store.getState().signIn.payload;
      const jsonData = JSON.parse(JSON.stringify(signInPayload));
      const accessToken = jsonData?.data.accessToken;
      config.headers.token = "Bearer " + accessToken;
      return config;
   },
   (error) => {
      // Do something with request error
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.response.use(
   (config: AxiosResponse) => {
      const response = {
         status: config.status,
         data: config.data,
      } as AxiosResponse;
      return response;
   },
   (err: AxiosError) => {
      const response = {
         message: err.response?.data,
         status: err.response?.status,
      };
      return response;
   }
);

export default axiosInstance;
