import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import { signInSuccess, signOut } from "../../redux-saga/redux/actions";
import { store, RootState } from "../../redux-saga/redux/store";
import { Profile } from "../../utils/interfaces/Profile";
import { refreshToken } from "../auth";
interface DecodedAccessToken {
   id: string;
   isAdmin: boolean;
   iat: number;
   exp: number;
}
const serverUrl = "http://localhost:8001";
const axiosInstance = axios.create({
   baseURL: serverUrl,
});

// Config interceptors: có thể coi như 1 tường chắn trước khi request / response

//>>> Config request
axiosInstance.interceptors.request.use(
   async (config) => {
      // Do something before request is sent
      const states: RootState = store.getState();
      const user = states.auth.payload?.user as Profile;
      let accessToken = states.auth.payload?.accessToken as string;
      // Check to get refresh token
      const date = new Date();
      const decodedToken: DecodedAccessToken = jwt_decode(accessToken);
      // When access token is expired, we need to refresh
      if (decodedToken.exp < date.getTime() / 1000) {
         try {
            const res = await refreshToken();
            accessToken = res.data?.accessToken;
            // Dispatch to update new access token
            store.dispatch(
               signInSuccess({
                  user,
                  accessToken,
               })
            );
         } catch (err) {
            // When out of date token
            store.dispatch(signOut());
         }
      }
      config.headers.token = "Bearer " + accessToken;
      return config;
   },
   (err) => {
      return Promise.reject(err);
   }
);

const httpClient = (axiosInstance) => {
   axiosInstance.interceptors.request.use(
      async function (config) {
         const authPayload: { user: Profile; accessToken: string } =
            store.getState()?.auth?.payload;
         let accessToken = authPayload.accessToken;
         const date = new Date();
         const decodedToken: any = jwt_decode(accessToken);
         if (decodedToken?.exp < date.getTime() / 1000) {
            try {
               const res = await refreshToken();
               accessToken = res.data.accessToken;
               const refreshUser: { user: Profile; accessToken: string } = {
                  user: authPayload.user,
                  accessToken,
               };
               store.dispatch(signInSuccess(refreshUser));
            } catch (err: any) {
               store.dispatch(signOut());
               throw new Error(err);
            }
         }
         config.headers.token = "Bearer " + accessToken;
         return config;
      },
      (error) => {
         // Do something with request error
         return Promise.reject(error);
      }
   );
};
export default httpClient;
