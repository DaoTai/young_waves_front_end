import axios from "axios";
import httpClient from "../httpClient";
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
   baseURL: "http://localhost:8001/posts",
});

httpClient(axiosInstance);
export default axiosInstance;
