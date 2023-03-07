import { AxiosError, AxiosResponse } from "axios";
import { store } from "../../redux-saga/redux/store";

let httpClient = (axiosInstance) => {
   axiosInstance.interceptors.request.use(
      function (config) {
         console.log(store.getState());

         const authPayload = store.getState()?.auth?.payload;
         const jsonData = JSON.parse(JSON.stringify(authPayload));
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
};
export default httpClient;
