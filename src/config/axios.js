import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/local-strorage";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (value) => Promise.resolve(value),
  (err) => {
    if (err.response.status === 401) {
      removeAccessToken();
      // ใช้ navigate ไม่ได้เพราะไม่ได้อยูุ่ในส่วนของ Component ต้องใช้ window.location.assign(path)
      window.location.assign("/login");
      return;
    }
    return Promise.reject(err);
  }
);

export default axios;
