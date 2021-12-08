import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
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
  async function (error) {}
);

export default instance;
