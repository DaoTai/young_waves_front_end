import axios from "axios";
import jwt_decode from "jwt-decode";
import { signInSuccess, signOut } from "../redux-saga/redux/actions";
import { RootState, store } from "../redux-saga/redux/store";
import { Profile } from "../utils/interfaces/Profile";
import { refreshToken } from "./auth";
interface DecodedAccessToken {
   id: string;
   isAdmin: boolean;
   iat: number;
   exp: number;
}
const serverUrl = "http://localhost:8001";

export const axiosInstance = axios.create({
   baseURL: serverUrl,
   withCredentials: true, // gửi cookie và header xác thực với các request giữa các miền khác nhau.
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
      // When access token is expired, we need to get refresh token
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
