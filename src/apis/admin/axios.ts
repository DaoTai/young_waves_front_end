import axios, { AxiosError, AxiosResponse } from "axios";
import httpClient from "../httpClient";
const axiosInstance = axios.create({
   baseURL: " http://localhost:8001/admin",
});

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
httpClient(axiosInstance);

export default axiosInstance;
