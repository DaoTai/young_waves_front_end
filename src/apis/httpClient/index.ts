import { AxiosError, AxiosResponse } from "axios";
import { store } from "../../redux-saga/redux/store";
import { Profile } from "../../utils/interfaces/Profile";

let httpClient = (axiosInstance) => {
   axiosInstance.interceptors.request.use(
      function (config) {
         const authPayload: { user: Profile; accessToken: string } =
            store.getState()?.auth?.payload;
         const accessToken = authPayload.accessToken;
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
