import axios, { AxiosError, AxiosResponse } from "axios";
import httpClient from "../httpClient";
const axiosInstance = axios.create({
   baseURL: "http://localhost:8001/posts",
});

httpClient(axiosInstance);
export default axiosInstance;
