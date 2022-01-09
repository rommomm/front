import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async function (error) {
    throw error.response.data;
  }
);

export default instance;
