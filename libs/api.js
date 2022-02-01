import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import router from "next/router";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    config.headers = {
      ...config.headers,
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
    if (error.response.status === 401) {
      Cookies.remove("token");
      message.error(error.response.data.message);
      router.reload();
    }
    throw error.response.data;
  }
);

export default instance;
