import axios from "axios";

const axiosInstance = axios.create({
   baseURL: " http://localhost:8001/user",
});

export default axiosInstance;
