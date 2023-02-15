import axios from "axios";
import httpClient from "../httpClient";
const axiosInstance = axios.create({
   baseURL: "http://localhost:8001/likes",
});

httpClient(axiosInstance);
export default axiosInstance;
