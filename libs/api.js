import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
