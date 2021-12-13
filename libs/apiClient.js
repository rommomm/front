import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiClient = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
