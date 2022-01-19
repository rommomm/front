import api from "../libs/api";

export default {
  signIn: (values) => api.post("/login", values),
  signUp: (values) => api.post("/register", values),
};
