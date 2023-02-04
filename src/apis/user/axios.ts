import axios, { AxiosError, AxiosResponse } from "axios";

const axiosInstance = axios.create({
   baseURL: " http://localhost:8001/user",
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

export default axiosInstance;
