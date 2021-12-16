import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL,
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

instance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("token");
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    throw error.response.data;
  }
);

export default instance;
